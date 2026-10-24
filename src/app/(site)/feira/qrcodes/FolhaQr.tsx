"use client";

import QrCode from "@/components/QrCode";
import { useOrigem } from "@/components/useOrigem";
import { expositores } from "@/lib/expositores";

const gerais = [
  { caminho: "/feira", titulo: "Portal da Feira", texto: "Expositores, mapa e informações", emoji: "🎪" },
  { caminho: "/feira/mapa", titulo: "Mapa das bancas", texto: "Encontre cada banca", emoji: "🗺️" },
  { caminho: "/feira/votar", titulo: "Vote na sua favorita", texto: "E avalie a feira", emoji: "⭐" },
  { caminho: "/music-cookies/presente", titulo: "Music Cookies", texto: "Crie seu presente musical", emoji: "🎵" },
];

export default function FolhaQr() {
  const origem = useOrigem();

  if (!origem) return null;

  const itens = [
    ...gerais,
    ...expositores.map((e) => ({
      caminho: `/feira/expositores/${e.slug}`,
      titulo: e.nome,
      texto: e.categoria,
      emoji: e.emoji,
    })),
  ];

  return (
    <div className="qr-grade" style={{ marginTop: 24 }}>
      {itens.map((i) => (
        <div key={i.caminho} className="cartao qr-item">
          <div style={{ fontSize: "1.8rem" }} aria-hidden>
            {i.emoji}
          </div>
          <strong>{i.titulo}</strong>
          <div className="suave pequeno">{i.texto}</div>
          <QrCode valor={`${origem}${i.caminho}`} className="qr" alt={`QR Code: ${i.titulo}`} tamanho={400} />
          <div className="pequeno" style={{ wordBreak: "break-all" }}>
            {origem.replace(/^https?:\/\//, "")}
            {i.caminho}
          </div>
        </div>
      ))}
    </div>
  );
}
