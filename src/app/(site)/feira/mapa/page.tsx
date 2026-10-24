import type { Metadata } from "next";
import Mapa from "./Mapa";

export const metadata: Metadata = {
  title: "Mapa das bancas",
  description: "Encontre cada banca da Feira de Empreendedorismo no pátio.",
};

export default function PaginaMapa() {
  return (
    <section className="secao">
      <div className="container">
        <span className="etiqueta">Feira · Mapa</span>
        <h1>Mapa das bancas</h1>
        <p className="suave">Toque em uma banca para ver o que ela oferece. A posição das bancas é confirmada na montagem.</p>
        <Mapa />
      </div>
    </section>
  );
}
