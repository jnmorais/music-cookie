"use client";

import QrCode from "@/components/QrCode";
import { useOrigem } from "@/components/useOrigem";
import { expositores } from "@/lib/expositores";

const gerais = [
  { caminho: "/feira", titulo: "Portal da Feira", texto: "Expositores, mapa e informações" },
  { caminho: "/feira/mapa", titulo: "Mapa das bancas", texto: "Localize cada banca" },
  { caminho: "/feira/votar", titulo: "Votação", texto: "Avalie o evento e as bancas" },
  { caminho: "/music-cookies/presente", titulo: "Music Cookies", texto: "Presente musical" },
];

export default function FolhaQr() {
  const origem = useOrigem();
  if (!origem) return null;

  const itens = [
    ...gerais.map((g) => ({ ...g, grupo: "Geral" })),
    ...expositores.map((e) => ({
      caminho: `/feira/expositores/${e.slug}`,
      titulo: e.nome,
      texto: e.categoria,
      grupo: "Banca",
    })),
  ];

  return (
    <div className="qr-grade">
      {itens.map((i) => (
        <div key={i.caminho} className="cartao qr-item">
          <span className="sobretitulo" style={{ margin: 0 }}>
            {i.grupo}
          </span>
          <strong>{i.titulo}</strong>
          <span className="suave pequeno">{i.texto}</span>
          <QrCode valor={`${origem}${i.caminho}`} className="qr" alt={`QR Code: ${i.titulo}`} tamanho={400} />
          <span className="suave" style={{ fontSize: "0.75rem", wordBreak: "break-all" }}>
            {origem.replace(/^https?:\/\//, "")}
            {i.caminho}
          </span>
        </div>
      ))}
    </div>
  );
}
