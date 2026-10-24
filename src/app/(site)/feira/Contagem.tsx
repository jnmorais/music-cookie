"use client";

import { useEffect, useState } from "react";
import { feira } from "@/lib/config";

const inicio = new Date(feira.data).getTime();
const fim = new Date(feira.fim).getTime();

export default function Contagem() {
  const [agora, setAgora] = useState<number | null>(null);

  useEffect(() => {
    setAgora(Date.now());
    const id = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (agora === null) return <div style={{ minHeight: 64 }} />;

  if (agora >= fim) {
    return <p className="aviso">A feira terminou. Obrigado a todos que participaram! 💜</p>;
  }
  if (agora >= inicio) {
    return <p className="aviso ok">🎉 A feira está acontecendo agora! Vote na sua banca favorita.</p>;
  }

  const s = Math.floor((inicio - agora) / 1000);
  const partes = [
    { n: Math.floor(s / 86400), r: "dias" },
    { n: Math.floor((s % 86400) / 3600), r: "horas" },
    { n: Math.floor((s % 3600) / 60), r: "min" },
    { n: s % 60, r: "seg" },
  ];

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} aria-label="Contagem regressiva para a feira">
      {partes.map((p) => (
        <div key={p.r} className="cartao" style={{ padding: "10px 16px", textAlign: "center", minWidth: 76 }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{p.n}</div>
          <div className="suave pequeno">{p.r}</div>
        </div>
      ))}
    </div>
  );
}
