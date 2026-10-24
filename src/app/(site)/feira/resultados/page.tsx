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
          <span className="sobretitulo">Feira · Indicadores</span>
          <h1>Painel ao vivo</h1>
          <p className="lead">Atualização automática a cada 10 segundos. Indicado para exibição em TV ou projetor.</p>
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
