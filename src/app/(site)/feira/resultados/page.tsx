import type { Metadata } from "next";
import Painel from "./Painel";

export const metadata: Metadata = {
  title: "Painel ao vivo",
  description: "Ranking das bancas e avaliação da Feira de Empreendedorismo em tempo real.",
};

export default function PaginaResultados() {
  return (
    <section className="secao">
      <div className="container">
        <span className="etiqueta">Feira · Painel ao vivo</span>
        <h1>Painel da feira</h1>
        <p className="suave">Atualiza sozinho a cada 10 segundos — ideal para deixar aberto em uma TV ou projetor.</p>
        <Painel />
      </div>
    </section>
  );
}
