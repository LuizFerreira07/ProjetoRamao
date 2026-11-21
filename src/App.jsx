import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { WHATSAPP, INSTAGRAM, CIDADE, PRODUCTS, GROUPS, formatBRL, coverOf, minPrice } from "./products";

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
const Close = (p) => <Svg {...p} sw={1.8}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
const Plus = (p) => <Svg {...p} sw={1.8}><path d="M12 5v14M5 12h14" /></Svg>;
const Minus = (p) => <Svg {...p} sw={1.8}><path d="M5 12h14" /></Svg>;

/* ---------------- Helpers ---------------- */
const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("chama-serena-cart-v2")) || [];
  } catch {
    return [];
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
          <Flame size={20} />
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
function Hero({ onNav, onWhats }) {
  return (
    <section className="hero container" id="topo">
      <div className="hero-copy">
        <div className="eyebrow"><span />PEQUENOS RITUAIS, GRANDES SENSAÇÕES</div>
        <h1>
          Luz, aroma e <em>serenidade</em> para o seu lar.
        </h1>
        <p className="lead">
          Velas artesanais, feitas à mão com cera vegetal e fragrâncias delicadas para transformar a atmosfera da sua casa.
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
        <div className="hero-art-text">
          <p>
            Acenda a calma.
            <br />
            <em>Sinta o momento.</em>
          </p>
          <small>FOTOGRAFIA ILUSTRATIVA</small>
        </div>
      </div>
    </section>
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
      <Flame size={36} />
    </div>
  );
}

function Products({ onSelect }) {
  return (
    <section className="section" id="produtos">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow plain">PRODUTOS</div>
          <h2>Feitas para acender o seu momento</h2>
          <p className="section-sub">Escolha uma vela para ver os detalhes, selecionar o aroma e adicionar ao carrinho.</p>
        </div>

        {GROUPS.map((g) => (
          <div key={g.id} className="group">
            <h3 className="group-title">{g.title}</h3>
            {g.note && <p className="group-note">{g.note}</p>}
            <div className="grid">
              {PRODUCTS.filter((p) => p.category === g.id).map((p, i) => (
                <button key={p.id} className="card" onClick={() => onSelect(p)}>
                  <div className="card-img"><ProductImage src={coverOf(p)} alt={p.name} index={i} /></div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    <span className="price">{p.sizes.length > 1 ? "A partir de " : ""}{formatBRL(minPrice(p))}</span>
                    <span className="card-cta">Ver detalhes</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Modal de produto ---------------- */
function ProductModal({ product, index, onClose, onAdd }) {
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
          <span className="price big">{formatBRL(size.price)}</span>
          <p>{product.description}</p>

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
        </div>
      </div>
    </div>
  );
}

/* ---------------- Como funciona ---------------- */
const STEPS = [
  { icon: <Flame size={24} />, title: "Escolha suas velas", text: "Veja os produtos, escolha o aroma e adicione ao carrinho. O valor aparece na hora." },
  { icon: <Chat size={24} />, title: "Envie pelo WhatsApp", text: "O pedido chega pronto pra gente. Por lá, combinamos os detalhes com você." },
  { icon: <Pix size={24} />, title: "Confirme o pagamento", text: "Combinamos a forma de pagamento e a produção começa após a confirmação." },
  { icon: <Box size={24} />, title: "Receba com carinho", text: "Sua vela é embalada com cuidado e chega até você." },
];

function HowItWorks() {
  return (
    <section className="section alt" id="como-funciona">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow plain">DO NOSSO ATELIÊ PARA O SEU LAR</div>
          <h2>Como funciona?</h2>
        </div>
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
  return (
    <section className="section" id="sobre">
      <div className="container about">
        <div className="about-art" aria-hidden="true"><Flame size={56} /></div>
        <div>
          <div className="eyebrow plain">SOBRE A CHAMA SERENA</div>
          <h2>Feitas à mão, <em>com calma</em>.</h2>
          <p>
            Cada vela da Chama Serena é feita à mão, com cera vegetal e fragrâncias delicadas, pensada para transformar a atmosfera da sua casa e criar pequenos rituais de pausa no seu dia.
          </p>
          <p>Nossas vendas são exclusivas e personalizadas pelo WhatsApp: você conversa com a gente e escolhe a sua vela.</p>
          <ul className="badges left">
            <li><Leaf size={16} /> Cera vegetal</li>
            <li><Flame size={16} /> Feitas à mão</li>
          </ul>
          {INSTAGRAM && (
            <a className="btn btn-outline link-btn" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer">
              Seguir @{INSTAGRAM}
            </a>
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
        <h2>Vamos acender algo só seu?</h2>
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
          <Flame size={20} />
          <span className="brand-text">
            <span className="brand-name">CHAMA SERENA</span>
            <span className="brand-sub">VELAS ARTESANAIS{CIDADE ? ` · ${CIDADE}` : ""}</span>
          </span>
        </div>
        <ul>
          {WHATSAPP && <li>WhatsApp: <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">{WHATSAPP}</a></li>}
          {INSTAGRAM && <li>Instagram: <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer">@{INSTAGRAM}</a></li>}
        </ul>
        <small>© {new Date().getFullYear()} Chama Serena. Feito à mão.</small>
      </div>
    </footer>
  );
}

/* ---------------- Carrinho ---------------- */
function CartDrawer({ items, onClose, onQty, onRemove, onCheckout }) {
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
          <button className="btn btn-primary btn-lg full" disabled={!items.length} onClick={onCheckout}>
            <Chat /> Enviar pedido pelo WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Aviso (WhatsApp ainda não configurado) ---------------- */
function Notice({ onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal notice" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <Flame size={22} />
        <h2>Estamos preparando nosso atendimento.</h2>
        <p>Nosso WhatsApp ainda não está disponível nesta página. Em breve, você poderá conversar com a gente e escolher sua vela por aqui.</p>
        <button className="btn btn-primary btn-lg full" onClick={onClose}>Entendi</button>
      </div>
    </div>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState(false);

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
    if (!WHATSAPP) return setNotice(true);
    window.open(`https://wa.me/${WHATSAPP}`, "_blank", "noopener");
  };

  const addToCart = (product, size, qty) => {
    const key = `${product.id}|${size.id}`;
    setCart((c) => {
      const found = c.find((i) => i.key === key);
      if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...c, { key, id: product.id, name: product.name, variant: size.label, price: size.price, qty }];
    });
    setSelected(null);
    setCartOpen(true);
  };

  const changeQty = (key, d) =>
    setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i)));
  const removeItem = (key) => setCart((c) => c.filter((i) => i.key !== key));

  const checkout = () => {
    if (!WHATSAPP) {
      setCartOpen(false);
      return setNotice(true);
    }
    const lines = cart.map((i) => `• ${i.qty}x ${i.name}${i.variant ? ` (${i.variant})` : ""} — ${formatBRL(i.price * i.qty)}`);
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = `Olá! Quero fazer um pedido na Chama Serena:\n\n${lines.join("\n")}\n\nTotal: ${formatBRL(total)}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const selectedIndex = selected ? PRODUCTS.filter((p) => p.category === selected.category).findIndex((p) => p.id === selected.id) : 0;

  return (
    <div className="app">
      <Header count={count} dark={dark} onTheme={() => setDark((d) => !d)} onCart={() => setCartOpen(true)} onNav={scrollTo} />
      <main>
        <Hero onNav={scrollTo} onWhats={openWhats} />
        <Products onSelect={setSelected} />
        <HowItWorks />
        <About />
        <FinalCta onNav={scrollTo} onWhats={openWhats} />
      </main>
      <Footer />

      {selected && <ProductModal product={selected} index={selectedIndex} onClose={() => setSelected(null)} onAdd={addToCart} />}
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQty={changeQty} onRemove={removeItem} onCheckout={checkout} />}
      {notice && <Notice onClose={() => setNotice(false)} />}
    </div>
  );
}
