import type { Metadata } from "next";
import Votacao from "./Votacao";

export const metadata: Metadata = {
  title: "Votação",
  description: "Escolha sua banca favorita e avalie a Feira de Empreendedorismo.",
};

export default function PaginaVotar() {
  return (
    <>
      <section className="cabecalho-pagina">
        <div className="container">
          <span className="sobretitulo">Feira · Avaliação do público</span>
          <h1>Votação</h1>
          <p className="lead">Escolha a banca de destaque e avalie o evento. Um registro por aparelho.</p>
        </div>
      </section>
      <section className="secao">
        <div className="container" style={{ maxWidth: 720 }}>
          <Votacao />
        </div>
      </section>
    </>
  );
}
