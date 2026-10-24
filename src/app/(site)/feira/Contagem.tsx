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

  if (agora === null) return <div style={{ minHeight: 52 }} />;

  if (agora >= fim) {
    return <span className="selo">Evento encerrado</span>;
  }
  if (agora >= inicio) {
    return <span className="selo sucesso">Evento em andamento</span>;
  }

  const s = Math.floor((inicio - agora) / 1000);
  const partes = [
    { n: Math.floor(s / 86400), r: "dias" },
    { n: Math.floor((s % 86400) / 3600), r: "horas" },
    { n: Math.floor((s % 3600) / 60), r: "min" },
    { n: s % 60, r: "seg" },
  ];

  return (
    <div aria-label="Tempo até o início do evento">
      <div className="suave pequeno" style={{ marginBottom: 6 }}>
        Início em
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {partes.map((p) => (
          <div key={p.r}>
            <div style={{ fontSize: "1.35rem", fontWeight: 650, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>
              {String(p.n).padStart(2, "0")}
            </div>
            <div className="suave" style={{ fontSize: "0.75rem" }}>
              {p.r}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
