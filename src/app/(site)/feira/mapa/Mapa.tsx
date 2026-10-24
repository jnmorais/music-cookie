"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { expositores, pontosDoMapa } from "@/lib/expositores";

const L = 18; // largura da banca no SVG
const A = 12; // altura da banca no SVG

export default function Mapa() {
  const [ativa, setAtiva] = useState<string | null>(null);

  useEffect(() => {
    const banca = new URLSearchParams(window.location.search).get("banca");
    if (banca && expositores.some((e) => e.slug === banca)) setAtiva(banca);
  }, []);

  const selecionada = expositores.find((e) => e.slug === ativa);

  return (
    <div className="grade-2">
      <svg className="mapa" viewBox="0 0 100 100" role="img" aria-label="Mapa do pátio com as bancas da feira">
        <rect x="3" y="3" width="94" height="94" rx="4" fill="#e9ecef" stroke="#ced4da" strokeWidth="0.6" />
        <rect x="8" y="44" width="84" height="12" rx="3" fill="#fff" opacity="0.8" />
        <text x="50" y="51.5" textAnchor="middle" fontSize="3.2" fill="#868e96">
          circulação · área de convivência
        </text>

        {expositores.map((e) => (
          <g
            key={e.slug}
            className={`banca${ativa === e.slug ? " ativa" : ""}`}
            tabIndex={0}
            role="button"
            aria-label={`${e.nome}, ${e.categoria}`}
            aria-pressed={ativa === e.slug}
            onClick={() => setAtiva(e.slug)}
            onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), setAtiva(e.slug))}
          >
            <rect
              x={e.mapa.x - L / 2}
              y={e.mapa.y - A / 2}
              width={L}
              height={A}
              rx="2"
              fill={e.cor}
              opacity={ativa && ativa !== e.slug ? 0.45 : 1}
            />
            <text x={e.mapa.x} y={e.mapa.y - 0.5} textAnchor="middle" fontSize="4.5">
              {e.emoji}
            </text>
            <text x={e.mapa.x} y={e.mapa.y + 4} textAnchor="middle" fontSize="2.4" fill="#fff" fontWeight="700">
              {e.nome.length > 14 ? e.nome.slice(0, 13) + "…" : e.nome}
            </text>
          </g>
        ))}

        {pontosDoMapa.map((p) => (
          <g key={p.id}>
            <rect x={p.x - L / 2} y={p.y - A / 2} width={L} height={A} rx="2" fill="#fff" stroke="#adb5bd" strokeWidth="0.5" strokeDasharray="1.5 1" />
            <text x={p.x} y={p.y - 0.5} textAnchor="middle" fontSize="4.5">
              {p.emoji}
            </text>
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="2.4" fill="#495057" fontWeight="700">
              {p.nome.length > 16 ? p.nome.slice(0, 15) + "…" : p.nome}
            </text>
          </g>
        ))}
      </svg>

      <div aria-live="polite">
        {selecionada ? (
          <div className="cartao expositor" style={{ "--cor": selecionada.cor } as React.CSSProperties}>
            <span className="icone" aria-hidden>
              {selecionada.emoji}
            </span>
            <h2 style={{ margin: 0 }}>{selecionada.nome}</h2>
            <span className="suave pequeno">{selecionada.categoria}</span>
            <p>{selecionada.resumo}</p>
            <div className="botoes">
              <Link className="botao feira pequeno" href={`/feira/expositores/${selecionada.slug}`}>
                Ver banca
              </Link>
              <Link className="botao verde pequeno" href={`/feira/votar?banca=${selecionada.slug}`}>
                Votar
              </Link>
            </div>
          </div>
        ) : (
          <div className="cartao">
            <h2 style={{ fontSize: "1.2rem" }}>Lista de bancas</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {expositores.map((e) => (
                <li key={e.slug}>
                  <button
                    type="button"
                    onClick={() => setAtiva(e.slug)}
                    style={{ background: "none", border: 0, font: "inherit", cursor: "pointer", color: "inherit", padding: 0, textAlign: "left" }}
                  >
                    <span aria-hidden>{e.emoji}</span> <strong>{e.nome}</strong> <span className="suave pequeno">· {e.categoria}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
