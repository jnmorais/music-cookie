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
          <span className="sobretitulo">Feira · Votação</span>
          <h1>Vote na sua banca favorita</h1>
          <p className="lead">Leva menos de 30 segundos. Vale um voto por celular.</p>
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
