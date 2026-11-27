import { useState, useEffect, useMemo, useRef, useCallback, Component } from "react";
import "./App.css";
import { WHATSAPP_URL, INSTAGRAM, TIKTOK_PERFIL, CIDADE, CIDADE_LOCAL, TIKTOK_SHOP, LOGO, LOGO_MARK, getAvailableProducts, isProductAvailable, GROUPS, formatBRL, coverOf, minPrice } from "./products";

/* ---------------- Ícones ---------------- */
const Svg = ({ size = 18, children, sw = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const Flame = (p) => <Svg {...p}><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.2 1 2 2 2-.5-3 0-6 1-8z" /></Svg>;
const Chat = (p) => <Svg {...p}><path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-5.2A8 8 0 1 1 21 12z" /></Svg>;
const Box = (p) => <Svg {...p}><path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" /></Svg>;
const Bag = (p) => <Svg {...p}><path d="M5 8h14l-1 12H6L5 8zM9 8a3 3 0 0 1 6 0" /></Svg>;
const Leaf = (p) => <Svg {...p}><path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19l8-8" /></Svg>;
const Pix = (p) => <Svg {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h3" /></Svg>;
const Moon = (p) => <Svg {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z" /></Svg>;
const Sun = (p) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Svg>;
const Menu = (p) => <Svg {...p} sw={1.7}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>;
const Chevron = ({ dir, ...p }) => <Svg {...p} sw={1.8}><path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} /></Svg>;
const Close = (p) => <Svg {...p} sw={1.8}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
const Plus = (p) => <Svg {...p} sw={1.8}><path d="M12 5v14M5 12h14" /></Svg>;
const Minus = (p) => <Svg {...p} sw={1.8}><path d="M5 12h14" /></Svg>;

/* ---------------- Helpers ---------------- */
const loadCart = () => {
  try {
    // descarta itens de produtos que já saíram do ar (ex.: coleção de Natal)
    const availableIds = new Set(getAvailableProducts().map((p) => p.id));
    return (JSON.parse(localStorage.getItem("chama-serena-cart-v2")) || []).filter((i) => availableIds.has(i.id));
  } catch {
    return [];
  }
};

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
};

const NAV = [
  { id: "produtos", label: "Produtos" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
];

/* ---------------- Cabeçalho ---------------- */
function Header({ count, dark, onTheme, onCart, onNav }) {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setOpen(false);
    onNav(id);
  };
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#topo" onClick={() => setOpen(false)}>
          <LogoMark mark size={20} className="brand-logo" />
          <span className="brand-text">
            <span className="brand-name">CHAMA SERENA</span>
            <span className="brand-sub">VELAS ARTESANAIS</span>
          </span>
        </a>

        <nav className="nav" aria-label="Principal">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-btn" onClick={onTheme} aria-label="Alternar tema">
            {dark ? <Sun /> : <Moon />}
          </button>
          <button className="icon-btn cart-btn" onClick={onCart} aria-label={`Carrinho, ${count} itens`}>
            <Bag size={22} />
            {count > 0 && <b className="badge">{count}</b>}
          </button>
          <button className="icon-btn burger" onClick={() => setOpen((o) => !o)} aria-label={open ? "Fechar menu" : "Abrir menu"}>
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Menu">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
// Logo oficial: completa (public/img/logo.webp) ou só o símbolo (logo-mark.webp).
// Se o arquivo não existir, mostra o ícone de chama.
function LogoMark({ size = 24, mark = false, className = "" }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <Flame size={size} />
  ) : (
    <img className={className} src={mark ? LOGO_MARK : LOGO} alt="Chama Serena Aromas" onError={() => setFailed(true)} />
  );
}

function Hero({ onNav, onWhats }) {
  return (
    <section className="hero container" id="topo">
      <div className="hero-watermark" aria-hidden="true"><LogoMark size={100} /></div>
      <div className="hero-copy">
        <div className="eyebrow"><span />PEQUENOS RITUAIS, GRANDES SENSAÇÕES</div>
        <h1>Chama Serena Aromas</h1>
        <p className="hero-tagline">Acalme sua mente e ilumine o seu espaço</p>
        <p className="lead">
          A Chama Serena Aromas é uma empresa criada em Santo Ângelo com o propósito de levar momentos calmos e aconchegantes para as pessoas. Atualmente, a empresa oferece aos clientes velas aromáticas e home sprays. O processo artesanal de fabricação utiliza produtos 100% naturais, como cera de coco, pavio de algodão e essências não tóxicas. Entregamos em Santo Ângelo/RS de forma gratuita e enviamos para todo o Brasil através do TikTok Shop.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => onNav("produtos")}>
            Montar meu pedido
          </button>
          <button className="btn btn-outline btn-lg" onClick={onWhats}>
            <Chat /> Falar no WhatsApp
          </button>
        </div>
        <ul className="badges">
          <li><Leaf size={16} /> Cera vegetal</li>
          <li><Flame size={16} /> Feitas à mão</li>
        </ul>
      </div>

      <div className="hero-art">
        <span className="chip"><Flame size={14} /> FEITA À MÃO, COM AMOR</span>
      </div>
    </section>
  );
}

/* ---------------- Carrossel (uma linha) ---------------- */
function Carousel({ children }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ prev: false, next: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const prev = el.scrollLeft > 4;
      const next = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
      setEdge((e) => (e.prev === prev && e.next === next ? e : { prev, next }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [children]);

  const go = (dir) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <div className="carousel">
      {edge.prev && <button className="car-btn prev" onClick={() => go(-1)} aria-label="Anterior"><Chevron dir="l" /></button>}
      <div className="car-track" ref={track}>{children}</div>
      {edge.next && <button className="car-btn next" onClick={() => go(1)} aria-label="Próximos"><Chevron dir="r" /></button>}
    </div>
  );
}

/* ---------------- Produtos ---------------- */
function ProductImage({ src, alt, index }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return src && !failed ? (
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  ) : (
    <div className={`ph ph-${index % 4}`}>
      <LogoMark mark size={36} className="ph-logo" />
    </div>
  );
}

function LocationBar({ local, onLocal }) {
  if (local === null) {
    return (
      <div className="locbar ask">
        <p>Você é de {CIDADE_LOCAL}?</p>
        <div className="ask-row">
          <button className="btn btn-primary" onClick={() => onLocal(true)}>Sim</button>
          <button className="btn btn-outline" onClick={() => onLocal(false)}>Não, sou de outra cidade</button>
        </div>
      </div>
    );
  }
  return (
    <div className="locbar">
      <span>{local ? `Compra para ${CIDADE_LOCAL}: pedido pelo WhatsApp` : "Compra para outras cidades: pelo TikTok Shop"}</span>
      <button className="link" onClick={() => onLocal(null)}>Alterar</button>
    </div>
  );
}

function Products({ products, onSelect, local, onLocal }) {
  return (
    <section className="section" id="produtos">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow plain">PRODUTOS</div>
          <h2>Tenha seu momento</h2>
          <p className="section-sub">Escolha um produto para ver os detalhes e selecionar o tamanho.</p>
          <LocationBar local={local} onLocal={onLocal} />
        </div>

        {GROUPS.map((g) => (
          <div key={g.id} className="group">
            <h3 className="group-title">{g.title}</h3>
            {g.note && <p className="group-note">{g.note}</p>}
            <Carousel>
              {products.filter((p) => p.category === g.id).map((p, i) => (
                <button key={p.id} className="card" onClick={() => onSelect(p)}>
                  <div className="card-img"><ProductImage src={coverOf(p)} alt={p.name} index={i} /></div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    {p.subtitle && <small className="card-sub">{p.subtitle}</small>}
                    <span className="price">{p.sizes.length > 1 ? "A partir de " : ""}{formatBRL(minPrice(p))}</span>
                    <span className="card-cta">Ver detalhes</span>
                  </div>
                </button>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Modal de produto ---------------- */
function ProductModal({ product, index, local, onClose, onAdd, onTiktok }) {
  const [size, setSize] = useState(product.sizes.find((s) => s.id === product.defaultSize) || product.sizes[0]);
  const [photo, setPhoto] = useState(0);
  const [qty, setQty] = useState(1);
  const photos = size.images || [];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal product-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close icon-btn" onClick={onClose} aria-label="Fechar"><Close /></button>
        <div className="pm-img">
          <ProductImage src={photos[photo]} alt={`${product.name} ${size.label}`} index={index} />
          {photos.length > 1 && (
            <div className="thumbs">
              {photos.map((src, i) => (
                <button key={src} className={i === photo ? "on" : ""} onClick={() => setPhoto(i)} aria-label={`Foto ${i + 1}`}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pm-info">
          <h2>{product.name}</h2>
          {product.subtitle && <small className="card-sub">{product.subtitle}</small>}
          <span className="price big">{formatBRL(size.price)}</span>
          <p>{size.description || product.description}</p>

          {product.sizes.length > 1 && (
            <div className="field">
              <span className="label">Tamanho</span>
              <div className="options">
                {product.sizes.map((s) => (
                  <button
                    key={s.id}
                    className={`opt ${s.id === size.id ? "on" : ""}`}
                    onClick={() => { setSize(s); setPhoto(0); }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {local === false ? (
            <>
              <p className="drawer-note">Para outras cidades, a compra é pela nossa loja oficial no TikTok Shop.</p>
              <button className="btn btn-primary btn-lg full" onClick={onTiktok}>Comprar no TikTok Shop</button>
            </>
          ) : (
            <>
              <div className="field">
                <span className="label">Quantidade</span>
                <div className="stepper">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menos"><Minus size={16} /></button>
                  <b>{qty}</b>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Mais"><Plus size={16} /></button>
                </div>
              </div>

              <button className="btn btn-primary btn-lg full" onClick={() => onAdd(product, size, qty)}>
                Adicionar · {formatBRL(size.price * qty)}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Como funciona ---------------- */
const STEPS = [
  { icon: <Flame size={24} />, title: "Monte o seu pedido", text: "Escolha suas velas, home sprays ou kits e selecione os aromas desejados aqui na página. O valor total aparece na hora." },
  { icon: <Chat size={24} />, title: "Envie pelo WhatsApp", text: "Com um clique, o seu pedido chega pronto no nosso WhatsApp. Por lá, confirmamos a disponibilidade e combinamos os detalhes." },
  { icon: <Pix size={24} />, title: "Pague com Pix", text: "O pagamento é feito de forma integral via Pix para confirmarmos a reserva ou iniciarmos a produção artesanal do seu pedido." },
  { icon: <Box size={24} />, title: "Receba em até 24 horas (Santo Ângelo)", text: "Para Santo Ângelo, combinamos a retirada no ateliê ou a entrega local (com frete grátis na cidade). Para outras localidades do Brasil, enviamos com segurança via TikTok Shop." },
];

function HowItWorks({ onTiktok }) {
  return (
    <section className="section alt" id="como-funciona">
      <div className="container">
        <div className="section-head center">
          <h2>Como funciona: Do pedido à entrega</h2>
        </div>

        <div className="outside">
          <div>
            <h3>Mora fora de {CIDADE_LOCAL}?</h3>
            <p>Para outras cidades e estados do Brasil, a forma mais rápida e econômica de comprar nossos aromas é direto pela nossa loja oficial no TikTok Shop.</p>
          </div>
          <button className="btn btn-primary" onClick={onTiktok}>Comprar no TikTok Shop</button>
        </div>

        <h3 className="steps-title">Para moradores de {CIDADE_LOCAL}</h3>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="step-icon">{s.icon}<b>{i + 1}</b></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Sobre ---------------- */
function About() {
  const tiktokLink = TIKTOK_PERFIL || TIKTOK_SHOP;
  return (
    <section className="section" id="sobre">
      <div className="container about">
        <div className="about-art"><LogoMark size={56} /></div>
        <div>
          <h2>Por trás de cada Chama Serena Aromas</h2>
          <p className="signature">Ramão Martins de Miranda — Fundador e Artesão da Chama Serena Aromas</p>
          <p>
            A ideia nasceu em 2024, mas entre a faculdade, o trabalho e os recursos limitados, o sonho precisou esperar um pouco na gaveta. No final daquele mesmo ano, decidi dar um passo decisivo: com o dinheiro da rescisão do antigo emprego, transformei o plano em realidade. Em fevereiro de 2025, nascia a Chama Serena Aromas.
          </p>
          <p>
            De lá para cá, cada vela que sai daqui carrega muito mais do que essência e cera de coco: leva um pedaço da nossa história, feita à mão, com todo o cuidado para tornar cada peça única.
          </p>
          <ul className="badges left">
            <li><Leaf size={16} /> Cera vegetal</li>
            <li><Flame size={16} /> Feitas à mão</li>
          </ul>
          <p>Venha fazer parte dessa jornada! Acompanhe nosso dia a dia e novidades nas redes sociais:</p>
          {(INSTAGRAM || tiktokLink) && (
            <div className="social">
              {INSTAGRAM && (
                <a className="btn btn-outline link-btn" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              )}
              {tiktokLink && (
                <a className="btn btn-outline link-btn" href={tiktokLink} target="_blank" rel="noreferrer">
                  TikTok
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA + rodapé ---------------- */
function FinalCta({ onNav, onWhats }) {
  return (
    <section className="cta" id="contato">
      <div className="container cta-inner">
        <h2>Que tal ter o seu momento?</h2>
        <p>Monte o seu pedido aqui no site ou chame a gente no WhatsApp para tirar dúvidas.</p>
        <div className="hero-actions center">
          <button className="btn btn-light btn-lg" onClick={() => onNav("produtos")}>Montar meu pedido</button>
          <button className="btn btn-ghost btn-lg" onClick={onWhats}><Chat /> Chamar no WhatsApp</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand static">
          <LogoMark mark size={20} className="brand-logo" />
          <span className="brand-text">
            <span className="brand-name">CHAMA SERENA</span>
            <span className="brand-sub">VELAS ARTESANAIS{CIDADE ? ` · ${CIDADE}` : ""}</span>
          </span>
        </div>
        <ul>
          {WHATSAPP_URL && <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a></li>}
          {INSTAGRAM && <li>Instagram: <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer">@{INSTAGRAM}</a></li>}
        </ul>
        <small className="footer-credits">
          © {new Date().getFullYear()} Chama Serena. Feito à mão.
          <span>
            Desenvolvido por:{" "}
            <a href="https://www.instagram.com/luizferreira30?knvt=dHFhdmQxcGFqZDNo" target="_blank" rel="noreferrer">@luizferreira30</a>
          </span>
        </small>
      </div>
    </footer>
  );
}

/* ---------------- Carrinho ---------------- */
function CartDrawer({ items, local, onLocal, order, copied, onCopy, onClose, onQty, onRemove, onCheckout, onTiktok }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="overlay drawer-overlay" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-label="Carrinho">
        <div className="drawer-head">
          <h2>Seu carrinho</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar"><Close /></button>
        </div>

        {items.length === 0 ? (
          <p className="empty">Seu carrinho está vazio. Escolha uma vela para começar.</p>
        ) : (
          <ul className="cart-list">
            {items.map((i) => (
              <li key={i.key}>
                <div>
                  <b>{i.name}</b>
                  {i.variant && <small>{i.variant}</small>}
                  <span className="price">{formatBRL(i.price * i.qty)}</span>
                </div>
                <div className="cart-ctrl">
                  <div className="stepper sm">
                    <button onClick={() => onQty(i.key, -1)} aria-label="Menos"><Minus size={14} /></button>
                    <b>{i.qty}</b>
                    <button onClick={() => onQty(i.key, 1)} aria-label="Mais"><Plus size={14} /></button>
                  </div>
                  <button className="link" onClick={() => onRemove(i.key)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer-foot">
          <div className="total"><span>Total</span><b>{formatBRL(total)}</b></div>
          {local === null ? (
            <div className="ask-local">
              <p>Você é de {CIDADE_LOCAL}?</p>
              <div className="ask-row">
                <button className="btn btn-primary" onClick={() => onLocal(true)}>Sim</button>
                <button className="btn btn-outline" onClick={() => onLocal(false)}>Não</button>
              </div>
            </div>
          ) : local ? (
            <>
              <button className="btn btn-primary btn-lg full" disabled={!items.length} onClick={onCheckout}>
                <Chat /> Enviar pedido pelo WhatsApp
              </button>
              {order && (
                <div className="order-box">
                  <p className="drawer-note">
                    {copied ? "Pedido copiado! " : ""}Se a mensagem não aparecer escrita no WhatsApp, copie o texto abaixo e cole na conversa.
                  </p>
                  <textarea readOnly value={order} rows={6} onFocus={(e) => e.target.select()} />
                  <button className="btn btn-outline full" onClick={onCopy}>{copied ? "Copiado ✓" : "Copiar pedido"}</button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="drawer-note">Para outras cidades, a compra é pela nossa loja oficial no TikTok Shop.</p>
              <button className="btn btn-primary btn-lg full" onClick={onTiktok}>Ir para o TikTok Shop</button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Aviso (WhatsApp ainda não configurado) ---------------- */
function Notice({ kind, onClose }) {
  const tiktok = kind === "tiktok";
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal notice" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <LogoMark mark size={22} className="notice-logo" />
        <h2>{tiktok ? "Nossa loja no TikTok Shop está chegando." : "Estamos preparando nosso atendimento."}</h2>
        <p>
          {tiktok
            ? "O link da nossa loja oficial ainda não está disponível nesta página. Em breve, você poderá comprar por lá."
            : "Nosso WhatsApp ainda não está disponível nesta página. Em breve, você poderá conversar com a gente e escolher sua vela por aqui."}
        </p>
        <button className="btn btn-primary btn-lg full" onClick={onClose}>Entendi</button>
      </div>
    </div>
  );
}

/* ---------------- Proteção contra tela em branco ---------------- */
// Se algum erro acontecer, mostra a mensagem na tela em vez de ficar tudo branco.
class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", color: "#4a3328", background: "#f3ede4", minHeight: "100vh" }}>
        <h2>Ops, algo deu errado ao carregar o site.</h2>
        <p style={{ margin: "12px 0" }}>Mande esta mensagem para quem está ajudando você:</p>
        <pre style={{ whiteSpace: "pre-wrap", background: "#fff", padding: 12, borderRadius: 8 }}>{String(this.state.error?.message || this.state.error)}</pre>
      </div>
    );
  }
}

/* ---------------- App ---------------- */
export default function App() {
  return (
    <ErrorBoundary>
      <Site />
    </ErrorBoundary>
  );
}

function Site() {
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState(loadCart);
  const [products, setProducts] = useState(getAvailableProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState(false); // false | "whats" | "tiktok"
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState("");
  const [local, setLocal] = useState(() => {
    try {
      const v = localStorage.getItem("chama-serena-local");
      return v === null ? null : v === "1";
    } catch {
      return null;
    }
  });

  const refreshCatalog = useCallback(() => {
    const available = getAvailableProducts();
    const availableIds = new Set(available.map((p) => p.id));
    const unchanged = products.length === available.length && products.every((p, i) => p.id === available[i].id);
    if (!unchanged) {
      setProducts(available);
      setOrder("");
    }
    setSelected((current) => (current && !availableIds.has(current.id) ? null : current));
    setCart((current) => {
      const valid = current.filter((item) => availableIds.has(item.id));
      return valid.length === current.length ? current : valid;
    });
  }, [products]);

  useEffect(() => {
    const timer = window.setInterval(refreshCatalog, 1000);
    const refreshWhenVisible = () => {
      if (!document.hidden) refreshCatalog();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener("focus", refreshWhenVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener("focus", refreshWhenVisible);
    };
  }, [refreshCatalog]);

  const chooseLocal = (v) => {
    setLocal(v);
    try {
      if (v === null) localStorage.removeItem("chama-serena-local");
      else localStorage.setItem("chama-serena-local", v ? "1" : "0");
    } catch {}
  };

  const openTiktok = (product) => {
    const url = product?.tiktok || TIKTOK_SHOP;
    if (!url) return setNotice("tiktok");
    window.open(url, "_blank", "noopener");
  };

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    try {
      localStorage.setItem("chama-serena-cart-v2", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openWhats = () => {
    if (!WHATSAPP_URL) return setNotice("whats");
    window.open(WHATSAPP_URL, "_blank", "noopener");
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (product, size, qty) => {
    if (!isProductAvailable(product)) {
      refreshCatalog();
      setSelected(null);
      setToast({ id: Date.now(), message: `${product.name} não está mais disponível.` });
      return;
    }
    const key = `${product.id}|${size.id}`;
    setCart((c) => {
      const found = c.find((i) => i.key === key);
      if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...c, { key, id: product.id, name: product.name, variant: size.label, price: size.price, qty }];
    });
    setSelected(null);
    setToast({ id: Date.now(), name: product.name, variant: size.label, qty });
  };

  const changeQty = (key, d) =>
    setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i)));
  const removeItem = (key) => setCart((c) => c.filter((i) => i.key !== key));

  const checkout = () => {
    const availableIds = new Set(getAvailableProducts().map((p) => p.id));
    const validCart = cart.filter((item) => availableIds.has(item.id));
    if (validCart.length !== cart.length) {
      setCart(validCart);
      setOrder("");
      setToast({ id: Date.now(), message: "Um ou mais itens saíram do catálogo. Revise seu carrinho." });
      return;
    }
    if (!WHATSAPP_URL) {
      setCartOpen(false);
      return setNotice("whats");
    }
    const lines = validCart.map((i) => `• ${i.qty}x ${i.name}${i.variant ? ` (${i.variant})` : ""} — ${formatBRL(i.price * i.qty)}`);
    const total = validCart.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = `Olá! Quero fazer um pedido na Chama Serena:\n\n${lines.join("\n")}\n\nTotal: ${formatBRL(total)}`;
    // Copia o pedido: se o WhatsApp não preencher a mensagem sozinho, o cliente só cola.
    setOrder(msg);
    setCopied(false);
    copyText(msg).then(setCopied);
    const url = `${WHATSAPP_URL}${WHATSAPP_URL.includes("?") ? "&" : "?"}text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  };

  const selectedIndex = selected ? products.filter((p) => p.category === selected.category).findIndex((p) => p.id === selected.id) : 0;

  return (
    <div className="app">
      <Header count={count} dark={dark} onTheme={() => setDark((d) => !d)} onCart={() => setCartOpen(true)} onNav={scrollTo} />
      <main>
        <Hero onNav={scrollTo} onWhats={openWhats} />
        <Products products={products} onSelect={setSelected} local={local} onLocal={chooseLocal} />
        <HowItWorks onTiktok={() => openTiktok()} />
        <About />
        <FinalCta onNav={scrollTo} onWhats={openWhats} />
      </main>
      <Footer />

      {toast && (
        <div className="toast" role="status" key={toast.id}>
          <span>{toast.message ? <b>{toast.message}</b> : <><b>{toast.qty}× {toast.name}</b> ({toast.variant}) adicionada ao carrinho</>}</span>
          {!toast.message && <button onClick={() => { setToast(null); setCartOpen(true); }}>Ver carrinho</button>}
        </div>
      )}

      {selected && (
        <ProductModal
          product={selected}
          index={selectedIndex}
          local={local}
          onClose={() => setSelected(null)}
          onAdd={addToCart}
          onTiktok={() => openTiktok(selected)}
        />
      )}
      {cartOpen && (
        <CartDrawer
          items={cart}
          local={local}
          onLocal={chooseLocal}
          onClose={() => setCartOpen(false)}
          onQty={changeQty}
          onRemove={removeItem}
          onCheckout={checkout}
          order={order}
          copied={copied}
          onCopy={() => copyText(order).then(setCopied)}
          onTiktok={() => openTiktok()}
        />
      )}
      {notice && <Notice kind={notice} onClose={() => setNotice(false)} />}
    </div>
  );
}
