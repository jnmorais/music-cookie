export type Expositor = {
  slug: string;
  nome: string;
  emoji: string;
  cor: string;
  categoria: string;
  resumo: string;
  produtos: string[];
  // Posição da banca no mapa do pátio (grade de 0 a 100). Layout ilustrativo: ajustar no dia da montagem.
  mapa: { x: number; y: number };
  destaqueLink?: { href: string; texto: string };
};

export const expositores: Expositor[] = [
  {
    slug: "music-cookies",
    nome: "Music Cookies",
    emoji: "🍪",
    cor: "#1db954",
    categoria: "Doces · Presentes",
    resumo:
      "Cookies com proposta de presente: cada embalagem traz um QR Code com uma música do Spotify e uma mensagem personalizada.",
    produtos: ["Cookies artesanais", "Embalagem presenteável com música", "Mensagem personalizada"],
    mapa: { x: 18, y: 28 },
    destaqueLink: { href: "/music-cookies/presente", texto: "Criar presente musical" },
  },
  {
    slug: "dolce-vita",
    nome: "Dolce Vita",
    emoji: "🧁",
    cor: "#e86fa0",
    categoria: "Doces",
    resumo: "Doces variados com identidade visual jovem, apresentação atrativa e atendimento próximo.",
    produtos: ["Doces variados", "Encomendas para a faculdade"],
    mapa: { x: 40, y: 28 },
  },
  {
    slug: "moki-cookies",
    nome: "MOKI Cookies",
    emoji: "🍪",
    cor: "#c8873f",
    categoria: "Doces",
    resumo: "Cookies artesanais, acessíveis e atrativos, com variedade de sabores e produção padronizada.",
    produtos: ["Cookies artesanais", "Vários sabores"],
    mapa: { x: 62, y: 28 },
  },
  {
    slug: "loja-de-brigadeiro",
    nome: "Loja de Brigadeiro",
    emoji: "🍫",
    cor: "#7a4a2a",
    categoria: "Doces gourmet",
    resumo: "Brigadeiros gourmet com preço acessível: qualidade e sofisticação para o público da feira.",
    produtos: ["Brigadeiros gourmet", "Caixinhas"],
    mapa: { x: 84, y: 28 },
  },
  {
    slug: "solitarium-pratas",
    nome: "Solitarium Pratas",
    emoji: "💍",
    cor: "#8b9bb4",
    categoria: "Acessórios",
    resumo: "Loja de pratas já existente, com produtos voltados às mulheres da Geração Z.",
    produtos: ["Brincos", "Colares", "Anéis de prata"],
    mapa: { x: 18, y: 72 },
  },
  {
    slug: "pastel-sa",
    nome: "Pastel S&A",
    emoji: "🥟",
    cor: "#e0a526",
    categoria: "Salgados",
    resumo: "Pastéis feitos na hora: alimentação rápida para quem circula pelo evento.",
    produtos: ["Pastéis", "Bebidas"],
    mapa: { x: 40, y: 72 },
  },
  {
    slug: "grupo-de-cafes",
    nome: "Grupo de Cafés",
    emoji: "☕",
    cor: "#6f4e37",
    categoria: "Bebidas",
    resumo: "Cafés durante a feira para atender o público que circula pelo evento.",
    produtos: ["Cafés", "Bebidas quentes"],
    mapa: { x: 62, y: 72 },
  },
];

export const pontosDoMapa = [
  { id: "entrada", nome: "Entrada", emoji: "🚪", x: 50, y: 96 },
  { id: "suporte", nome: "Suporte TI (SI/ES)", emoji: "🛟", x: 84, y: 72 },
];

export function buscarExpositor(slug: string) {
  return expositores.find((e) => e.slug === slug);
}
