import type { Metadata } from "next";
import Painel from "./Painel";

export const metadata: Metadata = {
  title: "Painel ao vivo",
  description: "Ranking das bancas e avaliação da Feira de Empreendedorismo em tempo real.",
};

export default function PaginaResultados() {
  return (
    <>
      <section className="cabecalho-pagina">
        <div className="container">
          <span className="sobretitulo">Feira · Resultados</span>
          <h1>Painel ao vivo</h1>
          <p className="lead">Atualiza sozinho a cada 10 segundos — dá para deixar aberto numa TV ou projetor.</p>
        </div>
      </section>
      <section className="secao">
        <div className="container">
          <Painel />
        </div>
      </section>
    </>
  );
}
