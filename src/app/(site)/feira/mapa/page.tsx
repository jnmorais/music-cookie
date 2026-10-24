import type { Metadata } from "next";
import Mapa from "./Mapa";

export const metadata: Metadata = {
  title: "Mapa das bancas",
  description: "Encontre cada banca da Feira de Empreendedorismo no pátio.",
};

export default function PaginaMapa() {
  return (
    <>
      <section className="cabecalho-pagina">
        <div className="container">
          <span className="sobretitulo">Feira · Mapa</span>
          <h1>Mapa das bancas</h1>
          <p className="lead">Toque numa banca para ver os detalhes. A posição final é confirmada na montagem.</p>
        </div>
      </section>
      <section className="secao">
        <div className="container">
          <Mapa />
        </div>
      </section>
    </>
  );
}
