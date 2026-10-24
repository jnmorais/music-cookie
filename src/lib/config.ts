// Dados editáveis do projeto. Ajuste aqui antes de apresentar/publicar.

export const equipe = {
  curso: "Sistemas de Informação / Engenharia de Software",
  // Contato de pelo menos um integrante do grupo de SI/ES.
  contatoNome: "Jean Morais",
  contatoEmail: "", // ex.: "seuemail@exemplo.com"
  contatoWhatsapp: "", // só números com DDI+DDD, ex.: "5511999999999"
  integrantes: ["Jean Morais"], // adicione os demais integrantes do grupo
};

export const musicCookies = {
  nome: "Music Cookies",
  slogan: "Cookies artesanais que vêm com trilha sonora.",
  instagram: "", // ex.: "musiccookies" (sem @)
  whatsapp: "", // número do grupo de Gestão para pedidos, ex.: "5511999999999"
  // Sabores e preços ilustrativos — confirmar com o grupo de Gestão.
  sabores: [
    { id: "tradicional", nome: "Tradicional", descricao: "Massa amanteigada com gotas de chocolate.", preco: 8, cor: "#c8873f" },
    { id: "duplo", nome: "Duplo Chocolate", descricao: "Massa de cacau com pedaços de chocolate meio amargo.", preco: 9, cor: "#5b3420" },
    { id: "redvelvet", nome: "Red Velvet", descricao: "Massa red velvet com gotas de chocolate branco.", preco: 10, cor: "#b3263e" },
    { id: "recheado", nome: "Recheado de Nutella", descricao: "Cookie recheado com creme de avelã.", preco: 11, cor: "#7a4a2a" },
  ],
};

// Endereço do portal da Feira de Empreendedorismo (projeto separado, Demanda 1B).
// Troque pelo domínio real depois do deploy na Vercel.
export const FEIRA_URL = "https://feira-empred.vercel.app";
