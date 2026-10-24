import type { Metadata } from "next";
import BotaoImprimir from "@/components/BotaoImprimir";
import FolhaQr from "./FolhaQr";

export const metadata: Metadata = {
  title: "Material impresso",
  description: "Folha de QR Codes da feira: portal, mapa, votação e uma placa para cada banca.",
};

export default function PaginaQrCodes() {
  return (
    <>
      <section className="cabecalho-pagina nao-imprimir">
        <div className="container">
          <span className="sobretitulo">Feira · Material impresso</span>
          <h1>QR Codes para impressão</h1>
          <p className="lead">
            Placas para a entrada, as mesas e cada banca. Os códigos apontam para o endereço em que o site está
            publicado.
          </p>
          <div className="botoes">
            <BotaoImprimir texto="Imprimir folha" />
          </div>
        </div>
      </section>
      <section className="secao">
        <div className="container">
          <FolhaQr />
        </div>
      </section>
    </>
  );
}
