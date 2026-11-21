// ============================================================
//  CONFIGURAÇÕES DA LOJA — edite aqui
// ============================================================

// WhatsApp com código do país + DDD + número, só dígitos. Ex.: "5555999999999"
// Enquanto estiver vazio, o botão mostra o aviso "Estamos preparando nosso atendimento".
export const WHATSAPP = "";

// Instagram sem o @ (opcional). Ex.: "chamaserena"
export const INSTAGRAM = "chamaserena.aromas";

export const CIDADE = "";

// ============================================================
//  PREÇOS
//    60g  = pote alto e fino
//    100g = pote baixo e largo ("gordinho")
// ============================================================
const PRECO_60G = 30;
const PRECO_100G = 100;
const PRECO_KIT = 80;

// ============================================================
//  FOTOS — é só salvar o arquivo em  public/img/  com o nome certo.
//  Vela:  <id>-60g.jpg  e  <id>-100g.jpg      (ex.: lavanda-60g.jpg)
//  Mais de uma foto no mesmo tamanho: <id>-100g-1.jpg, <id>-100g-2.jpg...
//         (e avise o número de fotos em n60 / n100 abaixo)
//  Kit:   <id>.jpg                             (ex.: kit-alecrim.jpg)
//  Enquanto a foto não existir, o site mostra um fundo ilustrativo.
//  Veja a lista completa em FOTOS.md
// ============================================================
const foto = (nome, n = 1) =>
  Array.from({ length: n }, (_, i) => `/img/${nome}${n > 1 ? `-${i + 1}` : ""}.jpg`);

const tamanhos = (id, { n60 = 1, n100 = 1 } = {}) => [
  { id: "60g", label: "60g", price: PRECO_60G, images: foto(`${id}-60g`, n60) },
  { id: "100g", label: "100g", price: PRECO_100G, images: foto(`${id}-100g`, n100) },
];

const kit = (id) => [{ id: "kit", label: "Home spray + vela", price: PRECO_KIT, images: foto(id) }];

// ============================================================
//  CATÁLOGO
//  category: "velas" ou "kits"
//  cover: foto da vitrine (opcional; por padrão é a 1ª foto)
//  defaultSize: tamanho que abre selecionado (opcional)
//  Se um sabor não existir em um dos tamanhos, troque tamanhos(...)
//  por uma lista sizes manual só com o tamanho que existe.
// ============================================================
export const GROUPS = [
  { id: "velas", title: "Velas aromáticas" },
  { id: "kits", title: "Kits", note: "Home spray + vela" },
];

export const PRODUCTS = [
  {
    id: "ambar",
    category: "velas",
    name: "Vela Âmbar",
    description: "Vela aromática artesanal com aroma quente e acolhedor de âmbar. Feita à mão com cera vegetal.",
    sizes: tamanhos("ambar"),
  },
  {
    id: "baunilha",
    category: "velas",
    name: "Vela Baunilha",
    description: "Vela aromática artesanal de baunilha: doce, aconchegante e delicada. Feita à mão com cera vegetal.",
    sizes: tamanhos("baunilha"),
  },
  {
    id: "cafe",
    category: "velas",
    name: "Vela Café",
    description: "Vela aromática artesanal com aroma de café, perfeita para deixar a casa aconchegante. Feita à mão com cera vegetal.",
    sizes: tamanhos("cafe"),
  },
  {
    id: "segredos-do-jardim",
    category: "velas",
    name: "Vela Segredos do Jardim",
    description: "Vela aromática artesanal em tons de rosa, com notas florais para um ambiente delicado. Feita à mão com cera vegetal.",
    sizes: tamanhos("segredos-do-jardim", { n100: 2 }),
    cover: "/img/segredos-do-jardim-100g-1.jpg",
    defaultSize: "100g",
  },
  {
    id: "cravo-e-canela",
    category: "velas",
    name: "Vela Cravo e Canela",
    description: "Vela aromática artesanal com aroma de cravo e canela. Feita à mão com cera vegetal.",
    sizes: tamanhos("cravo-e-canela"),
  },
  {
    id: "flor-de-cerejeira",
    category: "velas",
    name: "Vela Flor de Cerejeira",
    description: "Vela aromática artesanal com aroma floral de flor de cerejeira. Feita à mão com cera vegetal.",
    sizes: tamanhos("flor-de-cerejeira"),
  },
  {
    id: "lavanda",
    category: "velas",
    name: "Vela Lavanda",
    description: "Vela aromática artesanal de lavanda, para desacelerar e relaxar. Feita à mão com cera vegetal.",
    sizes: tamanhos("lavanda"),
  },
  {
    id: "prosperidade",
    category: "velas",
    name: "Vela Prosperidade",
    description: "Vela aromática artesanal da linha Prosperidade. Feita à mão com cera vegetal.",
    sizes: tamanhos("prosperidade"),
  },
  {
    id: "renovacao",
    category: "velas",
    name: "Vela Renovação",
    description: "Vela aromática artesanal da linha Renovação. Feita à mão com cera vegetal.",
    sizes: tamanhos("renovacao"),
  },

  // ---------------- Kits (home spray + vela) ----------------
  {
    id: "kit-alecrim",
    category: "kits",
    name: "Kit Alecrim",
    description: "Kit com home spray e vela aromática de alecrim, para perfumar e transformar o ambiente.",
    sizes: kit("kit-alecrim"),
  },
  {
    id: "kit-ambar",
    category: "kits",
    name: "Kit Âmbar",
    description: "Kit com home spray e vela aromática de âmbar, para perfumar e transformar o ambiente.",
    sizes: kit("kit-ambar"),
  },
  {
    id: "kit-cravo-e-canela",
    category: "kits",
    name: "Kit Cravo e Canela",
    description: "Kit com home spray e vela aromática de cravo e canela, para perfumar e transformar o ambiente.",
    sizes: kit("kit-cravo-e-canela"),
  },
];

export const coverOf = (p) => p.cover || p.sizes.flatMap((s) => s.images || [])[0] || "";
export const minPrice = (p) => Math.min(...p.sizes.map((s) => s.price));
export const formatBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
