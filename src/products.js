// ============================================================
//  CONFIGURAÇÕES DA LOJA — edite aqui
// ============================================================

// Link do WhatsApp da loja (link de mensagem do WhatsApp Business).
export const WHATSAPP_LINK = "https://wa.me/message/2Q4N5K65MELZA1";

// Alternativa: número com código do país + DDD, só dígitos. Ex.: "5555999999999"
// Se preenchido, tem prioridade sobre o link e o pedido já vai escrito na conversa.
export const WHATSAPP = "55999421422";

// Enquanto não houver link nem número, o botão mostra o aviso "Estamos preparando nosso atendimento".
// Com número configurado, o pedido chega PRÉ-PREENCHIDO no WhatsApp (recomendado).
// O link curto (wa.me/message/...) abre a conversa, mas não preenche o texto.
export const WHATSAPP_URL = WHATSAPP ? `https://wa.me/${WHATSAPP}` : WHATSAPP_LINK;
// true quando o link aceita mensagem pré-preenchida
export const WHATSAPP_PREENCHE = Boolean(WHATSAPP);

// Instagram sem o @ (opcional). Ex.: "chamaserena"
export const INSTAGRAM = "chamaserena.aromas";

// Perfil da loja no TikTok (link completo). Ex.: "https://www.tiktok.com/@chamaserena"
// Se ficar vazio, o botão de TikTok na seção "Sobre" usa o link do TikTok Shop (se existir).
export const TIKTOK_PERFIL = "";

export const CIDADE = "Santo Ângelo, RS";

// Cidade onde a compra é feita direto pelo site/WhatsApp
export const CIDADE_LOCAL = "Santo Ângelo";

// Link da loja oficial no TikTok Shop (para quem mora em outras cidades).
// Enquanto estiver vazio, o botão mostra um aviso "em breve".
// Dica: se um produto tiver link próprio, adicione  tiktok: "https://..."  nele.
export const TIKTOK_SHOP = "https://vt.tiktok.com/ZSsRByphY/?page=TikTokShop";

// Logo da chama (usada como marca d'água no topo e na seção "Sobre").
// Salve o arquivo em public/img/logo.png. Se não existir, o site usa um ícone de chama.
export const LOGO = "/img/logo.webp";          // logo completa (com o nome)
export const LOGO_MARK = "/img/logo-mark.webp"; // só o símbolo (chama + folhas), para tamanhos pequenos

// ============================================================
//  PREÇOS
//    60g  = pote alto e fino
//    100g = pote baixo e largo ("gordinho")
// ============================================================
const PRECO_60G = 30;
const PRECO_100G = 40;
const PRECO_KIT = 80;
const PRECO_PRESENTE_40G = 25;
const PRECO_KIT_3_VELAS = 60;
const PRECO_HOME_SPRAY = 50;

// ============================================================
//  FOTOS — é só salvar o arquivo em  public/img/  com o nome certo.
//  Vela:  <id>-60g.webp  e  <id>-100g.webp      (ex.: ambar-60g.webp)
//  Mais de uma foto no mesmo tamanho: <id>-100g-1.webp, <id>-100g-2.webp...
//         (e avise o número de fotos em n60 / n100 abaixo)
//  Kit:   <id>.webp                             (ex.: kit-alecrim.webp)
//  Enquanto a foto não existir, o site mostra um fundo ilustrativo.
//  Veja a lista completa em FOTOS.md
// ============================================================
const foto = (nome, n = 1) =>
  Array.from({ length: n }, (_, i) => `/img/${nome}${n > 1 ? `-${i + 1}` : ""}.webp`);

const tamanhos = (id, { n60 = 1, n100 = 1 } = {}) => [
  { id: "60g", label: "60g", price: PRECO_60G, images: foto(`${id}-60g`, n60) },
  { id: "100g", label: "100g", price: PRECO_100G, images: foto(`${id}-100g`, n100) },
];

const kit = (id) => [{ id: "kit", label: "Home Spray 200ml + Vela 100g", price: PRECO_KIT, images: foto(id) }];

// ============================================================
//  CATÁLOGO
//  category: "velas", "home-sprays", "kits" ou "presentes"
//  subtitle: linha extra no card (opcional)
//  cover: foto da vitrine (opcional; por padrão é a 1ª foto)
//  defaultSize: tamanho que abre selecionado (opcional)
// ============================================================
export const GROUPS = [
  { id: "velas", title: "Velas aromáticas" },
  { id: "home-sprays", title: "Home Sprays", note: "Frasco de 200ml para perfumar o ambiente na hora" },
  { id: "kits", title: "Kits", note: "Home Spray 200ml + Vela Aromática 100g" },
  { id: "presentes", title: "Para presentear", note: "Vela 40g e kit com 3 velas, ótimos para mimar alguém" },
];

const PRODUCTS_BASE = [
  // ---------------- Coleção de Natal (temporária) ----------------
  // "saiEm": primeiro dia em que a vela já não aparece, às 00h no fuso de Brasília.
  // Apague o campo para deixá-la fixa.
  // "semAviso": não coloca a nota de imagem ilustrada por IA (as fotos são reais).
  {
    id: "natal-cereja-avela",
    category: "velas",
    name: "Cereja & Avelã",
    subtitle: "Coleção de Natal · edição limitada",
    description:
      "Doce, envolvente e acolhedor, como um abraço de Natal. A vela aromática Cereja & Avelã faz parte da nossa coleção especial de Natal e fica disponível até 25/12/2026. Produzida artesanalmente com muito carinho, cera de coco e pavio 100% algodão para uma queima limpa.",
    sizes: [{ id: "100g", label: "100g", price: PRECO_100G, images: ["/img/cereja-avela-100g.webp"] }],
    saiEm: "2026-12-26",
    semAviso: true,
  },
  {
    id: "natal-manga-verde",
    category: "velas",
    name: "Manga Verde",
    subtitle: "Coleção de Natal · edição limitada",
    description:
      "Fresco, cítrico e vibrante, inspirado no nosso jeitinho brasileiro de celebrar o Natal em pleno verão. A vela aromática Manga Verde faz parte da nossa coleção especial de Natal e fica disponível até 25/12/2026. Produzida artesanalmente com muito carinho, cera de coco e pavio 100% algodão para uma queima limpa.",
    sizes: [{ id: "100g", label: "100g", price: PRECO_100G, images: ["/img/manga-verde-100g.webp"] }],
    saiEm: "2026-12-26",
    semAviso: true,
  },
  {
    id: "ambar",
    category: "velas",
    name: "Vela Âmbar",
    description:
      "Transforme a sua sala ou quarto em um ambiente sofisticado e profundamente acolhedor. A nossa vela de Âmbar de 60g/100g entrega horas de perfumação com uma fragrância Oriental Ambarada inconfundível. Ela combina a suavidade do coco e da lavanda com um coração floral amadeirado, fechando com um fundo quente de âmbar, musk, vetiver e baunilha. Produzida artesanalmente com muito carinho, cera de coco e pavio 100% algodão para uma queima limpa e duradoura.",
    sizes: tamanhos("ambar"),
  },
  {
    id: "baunilha",
    category: "velas",
    name: "Vela Baunilha",
    description:
      "Amantes de aromas adocicados, essa é para vocês! A vela de Baunilha de 60g/100g preenche o ambiente com uma fragrância Oriental Gourmand marcante. A mistura de baunilha e caramelo encontra o toque perfeito das frutas vermelhas, criando uma atmosfera deliciosa e acolhedora na sua sala ou quarto. Produzida artesanalmente com cera de coco pura e pavio 100% algodão para uma queima limpa.",
    sizes: tamanhos("baunilha"),
  },
  {
    id: "cafe",
    category: "velas",
    name: "Vela Café Torrado",
    description:
      "Quer transformar a sua sala ou quarto em uma verdadeira cafeteria acolhedora? A nossa vela de Café Torrado de 60g/100g tem o tamanho ideal para garantir horas de um perfume marcante e envolvente no ambiente. A combinação de café, cereja, canela e aquele fundo cremoso de baunilha vai te conquistar! Produzida artesanalmente com muito carinho, cera de coco pura e pavio 100% algodão para uma queima limpa.",
    sizes: tamanhos("cafe"),
  },
  {
    id: "lavanda-francesa",
    category: "velas",
    name: "Lavanda Francesa",
    description:
      "Transforme o seu quarto em um verdadeiro spa de tranquilidade. A vela de Lavanda Francesa de 60g entrega uma perfumação Floral Aromática elegante e duradoura. O frescor da lavanda e do eucalipto se une à delicadeza das rosas e à sofisticação da fava tonka. Produzida artesanalmente com muito carinho, cera de coco pura e pavio 100% algodão.",
    sizes: [
      { id: "60g", label: "60g", price: PRECO_60G, images: ["/img/lavanda-60g.webp"],
        description: "Transforme o seu quarto em um verdadeiro spa de tranquilidade. A vela de Lavanda Francesa de 60g entrega uma perfumação Floral Aromática elegante e duradoura. O frescor da lavanda e do eucalipto se une à delicadeza das rosas e à sofisticação da fava tonka. Produzida artesanalmente com muito carinho, cera de coco pura e pavio 100% algodão." },
      { id: "100g", label: "100g", price: PRECO_100G, images: ["/img/lavanda-100g.webp"],
        description: "Transforme o seu quarto em um verdadeiro spa de tranquilidade. A vela de Lavanda Francesa de 100g entrega uma perfumação Floral Aromática elegante e duradoura. O frescor da lavanda e do eucalipto se une à delicadeza das rosas e à sofisticação da fava tonka. Produzida artesanalmente com muito carinho, cera de coco pura e pavio 100% algodão." },
    ],
  },
  {
    id: "segredos-do-jardim",
    category: "velas",
    name: "Segredos do Jardim",
    description:
      "Transforme o seu quarto em um verdadeiro spa de tranquilidade. A vela Segredos do Jardim de 100g entrega uma perfumação Floral Aromática elegante e duradoura. O frescor da lavanda e do eucalipto se une à delicadeza das rosas e à sofisticação da fava tonka. Produzida artesanalmente com muito carinho, cera de coco pura e pavio 100% algodão.",
    sizes: [
      { id: "100g", label: "100g", price: PRECO_100G, images: ["/img/segredos-do-jardim-100g-1.webp", "/img/segredos-do-jardim-100g-2.webp"] },
    ],
    cover: "/img/segredos-do-jardim-100g-1.webp",
  },
  {
    id: "cravo-e-canela",
    category: "velas",
    name: "Vela Cravo e Canela",
    description:
      "Quer transformar a sua sala em um ambiente super aconchegante com um aroma marcante? A nossa vela de Cravo e Canela de 60g/100g une o calor especiado da canela e do cravo com a vivacidade da laranja, suavizadas por um fundo envolvente de baunilha e madeira aveludada. Ideal para perfumar grandes espaços e trazer aquela sensação acolhedora! Produzida artesanalmente com muito carinho, cera de coco pura e pavio 100% algodão para uma queima limpa.",
    sizes: tamanhos("cravo-e-canela"),
  },
  {
    id: "flor-de-cerejeira",
    category: "velas",
    name: "Vela Flor de Cerejeira",
    description:
      "Deixe a sua casa com um perfume romântico e sofisticado que encanta qualquer visita. A nossa vela de Flor de Cerejeira de 60g/100g combina a suavidade floral com o dulçor na medida certa da maçã e do morango, garantindo horas de um aroma marcante e acolhedor nos maiores ambientes. Produzida artesanalmente com cera de coco pura e pavio 100% algodão para uma queima limpa.",
    sizes: tamanhos("flor-de-cerejeira"),
  },
  {
    id: "prosperidade",
    category: "velas",
    name: "Vela Prosperidade (Alecrim)",
    description:
      "Quer perfumar a casa com aquela sensação revigorante de limpeza e renovação? A nossa vela de Alecrim de 60g/100g traz o poder da aromaterapia para o seu ambiente. O frescor herbal do alecrim e do eucalipto se une à madeira de pinho, trazendo foco, leveza e prosperidade para a sua rotina. Produzida artesanalmente com muito carinho, cera de coco e pavio 100% algodão.",
    sizes: tamanhos("prosperidade"),
  },
  {
    id: "renovacao",
    category: "velas",
    name: "Vela Renovação (Flores Brancas)",
    description:
      "Crie um ambiente sereno, sofisticado e profundamente envolvente na sua casa. A vela de Flores Brancas de 60g/100g captura o frescor das flores em sua forma mais pura. Com notas de flor de maçã, lírios e rosas, ela transmite uma sensação incrível de leveza e bem-estar para salas e quartos. Produzida artesanalmente com cera de coco pura e pavio 100% algodão para uma queima limpa.",
    sizes: tamanhos("renovacao"),
  },

  // ---------------- Kits (Home Spray 200ml + Vela 100g) ----------------
  {
    id: "kit-cravo-e-canela",
    category: "kits",
    name: "Kit Cravo e Canela",
    subtitle: "Home Spray 200ml + Vela 100g",
    description:
      "Quer transformar a sua casa em um refúgio super aconchegante e acolhedor? O nosso Kit Cravo e Canela une a vela aromática de 100g (feita artesanalmente com cera de coco e pavio 100% algodão) e o Home Spray de 200ml. Juntos, eles combinam o calor da canela, notas cítricas de laranja e um fundo aveludado de baunilha para perfumar o ambiente inteiro instantaneamente! O combo perfeito para decorar, perfumar e criar memórias afetivas.",
    sizes: kit("kit-cravo-e-canela"),
  },
  {
    id: "kit-alecrim",
    category: "kits",
    name: "Kit Alecrim",
    subtitle: "Home Spray 200ml + Vela 100g",
    description:
      "Frescor, energia e aquela sensação deliciosa de casa limpa e próspera! Conheça o nosso Kit Alecrim, composto por uma vela aromática de 100g e um Home Spray de 200ml. A fragrância traz a vivacidade do alecrim e do eucalipto aliada ao jasmim e à madeira de pinho, trazendo foco e leveza para a sua rotina. Produzido de forma artesanal com muito carinho e cera de coco pura.",
    sizes: kit("kit-alecrim"),
  },
  {
    id: "kit-ambar",
    category: "kits",
    name: "Kit Âmbar",
    subtitle: "Home Spray 200ml + Vela 100g",
    description:
      "Sofisticação, aconchego e um toque amadeirado inconfundível para a sua casa. O nosso Kit Âmbar traz a dupla perfeita: vela aromática de 100g e Home Spray de 200ml. Uma fragrância Oriental Ambarada que combina coco, lavanda, sândalo e um fundo quente de âmbar, baunilha e patchouli. Feito artesanalmente com cera de coco para garantir uma perfumação marcante e elegante.",
    sizes: kit("kit-ambar"),
  },
  // ---------------- Home Sprays (200ml, avulsos) ----------------
  {
    id: "homespray-cravo-canela",
    category: "home-sprays",
    name: "Home Spray (200ml) – Cravo e Canela",
    description:
      "Quer transformar a sua casa em um refúgio super aconchegante e acolhedor? O Nosso Home Spray de Cravo e canela, combina calor da canela, notas cítricas de laranja e um fundo aveludado de baunilha para perfumar o ambiente inteiro instantaneamente! É o produto perfeito para decorar, perfumar e criar memórias afetivas.",
    sizes: [{ id: "200ml", label: "200ml", price: PRECO_HOME_SPRAY, images: ["/img/homespray-cravo-canela.webp"] }],
  },
  {
    id: "homespray-alecrim",
    category: "home-sprays",
    name: "Home Spray (200ml) – Alecrim",
    description:
      "Frescor, energia e aquela sensação deliciosa de casa limpa e próspera! O nosso Home Spray de Alecrim traz a vivacidade do alecrim e do eucalipto aliada ao jasmim e à madeira de pinho, trazendo foco e leveza para a sua rotina. Produzido de forma artesanal com muito carinho e cera de coco pura.",
    sizes: [{ id: "200ml", label: "200ml", price: PRECO_HOME_SPRAY, images: ["/img/homespray-alecrim.webp"] }],
  },
  {
    id: "homespray-ambar",
    category: "home-sprays",
    name: "Home Spray (200ml) – Âmbar",
    description:
      "Sofisticação, aconchego e um toque amadeirado inconfundível para a sua casa. O nosso Home Spray de Âmbar traz uma fragrância Oriental Ambarada que combina coco, lavanda, sândalo e um fundo quente de âmbar, baunilha e patchouli. Feito artesanalmente para garantir uma perfumação marcante e elegante.",
    sizes: [{ id: "200ml", label: "200ml", price: PRECO_HOME_SPRAY, images: ["/img/homespray-ambar.webp"] }],
  },

  // ---------------- Presentes ----------------
  {
    id: "vela-presente-40g",
    category: "presentes",
    name: "Vela Presente 40g",
    subtitle: "Tamanho ideal para presentear",
    description:
      "Um mimo pequeno com grande significado! A vela presente de 40g é perfeita para surpreender alguém querido com um momento de calma. Produzida artesanalmente com muito carinho, cera de coco e pavio 100% algodão para uma queima limpa. Fale com a gente pelo WhatsApp para combinar o aroma.",
    sizes: [{ id: "40g", label: "40g", price: PRECO_PRESENTE_40G, images: foto("vela-presente-40g") }],
  },
  {
    id: "kit-3-velas-40g",
    category: "presentes",
    name: "Kit 3 Velas 40g",
    subtitle: "3 velas aromáticas de 40g",
    description:
      "Três velas, três momentos! O kit com 3 velas de 40g é o presente ideal para quem ama aromas ou para você experimentar fragrâncias diferentes. Produzidas artesanalmente com muito carinho, cera de coco e pavio 100% algodão para uma queima limpa. Fale com a gente pelo WhatsApp para escolher os aromas do seu kit.",
    sizes: [{ id: "kit3", label: "3 velas de 40g", price: PRECO_KIT_3_VELAS, images: foto("kit-3-velas-40g") }],
  },
];

// Aviso de imagem ilustrativa, adicionado ao final da descrição de TODOS os produtos.
const AVISO_IA = "(Nota: Vídeo/imagem ilustrativa gerada por Inteligência Artificial).";
const comAviso = (t) => (t && !t.includes(AVISO_IA) ? `${t} ${AVISO_IA}` : t);
const CATALOGO_TIME_ZONE = "America/Sao_Paulo";

const dataAtualEmBrasilia = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CATALOGO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};

// "saiEm" é exclusivo: o item fica disponível até 23:59:59 do dia anterior,
// independentemente do fuso configurado no dispositivo do visitante.
export const isProductAvailable = (product, now = new Date()) =>
  !product.saiEm || dataAtualEmBrasilia(now) < product.saiEm;

export const getAvailableProducts = (now = new Date()) => PRODUCTS_BASE.filter((p) => isProductAvailable(p, now)).map((p) =>
  p.semAviso
    ? p
    : {
        ...p,
        description: comAviso(p.description),
        sizes: p.sizes.map((s) => (s.description ? { ...s, description: comAviso(s.description) } : s)),
      }
);

// Snapshot inicial; a UI atualiza o catálogo em runtime para abas já abertas.
export const PRODUCTS = getAvailableProducts();

export const coverOf = (p) => p.cover || p.sizes.flatMap((s) => s.images || [])[0] || "";
export const minPrice = (p) => Math.min(...p.sizes.map((s) => s.price));
export const formatBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
