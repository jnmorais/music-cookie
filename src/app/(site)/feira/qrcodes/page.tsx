import type { Metadata } from "next";
import BotaoImprimir from "@/components/BotaoImprimir";
import FolhaQr from "./FolhaQr";

export const metadata: Metadata = {
  title: "QR Codes para imprimir",
  description: "Folha de QR Codes da feira: portal, mapa, votação e uma placa para cada banca.",
};

export default function PaginaQrCodes() {
  return (
    <section className="secao">
      <div className="container">
        <div className="nao-imprimir">
          <span className="etiqueta">Feira · Material impresso</span>
          <h1>QR Codes para imprimir</h1>
          <p className="suave" style={{ maxWidth: 640 }}>
            Imprima e cole na entrada, nas mesas e em cada banca. Os códigos apontam para o endereço em que este site
            está publicado.
          </p>
          <BotaoImprimir className="botao feira" texto="🖨️ Imprimir folha" />
        </div>
        <FolhaQr />
      </div>
    </section>
  );
}
