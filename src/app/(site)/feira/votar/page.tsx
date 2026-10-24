import type { Metadata } from "next";
import Votacao from "./Votacao";

export const metadata: Metadata = {
  title: "Votar na banca favorita",
  description: "Escolha sua banca favorita e avalie a Feira de Empreendedorismo.",
};

export default function PaginaVotar() {
  return (
    <section className="secao">
      <div className="container" style={{ maxWidth: 760 }}>
        <span className="etiqueta">Feira · Votação</span>
        <h1>Qual foi sua banca favorita?</h1>
        <p className="suave">Um voto por aparelho. Leva menos de 30 segundos.</p>
        <Votacao />
      </div>
    </section>
  );
}
