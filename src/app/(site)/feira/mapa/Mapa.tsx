"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Monograma from "@/components/Monograma";
import { expositores, pontosDoMapa, sigla } from "@/lib/expositores";

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
    <div className="layout-lateral">
      <svg className="mapa" viewBox="0 0 100 100" role="img" aria-label="Planta do pátio com as bancas da feira">
        <defs>
          <pattern id="grade" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#eef0f3" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect x="3" y="3" width="94" height="94" rx="1.5" fill="url(#grade)" stroke="#cfd4dc" strokeWidth="0.4" />
        <rect x="8" y="44" width="84" height="12" rx="1" fill="#f6f7f9" stroke="#e3e6eb" strokeWidth="0.3" />
        <text x="50" y="51" textAnchor="middle" fontSize="2.6" fill="#8a93a1" letterSpacing="0.3">
          CIRCULAÇÃO · ÁREA DE CONVIVÊNCIA
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
              rx="1"
              fill={e.cor}
              opacity={ativa && ativa !== e.slug ? 0.35 : 1}
            />
            <text x={e.mapa.x} y={e.mapa.y + 0.2} textAnchor="middle" fontSize="3.6" fill="#fff" fontWeight="700">
              {e.sigla ?? sigla(e.nome)}
            </text>
            <text x={e.mapa.x} y={e.mapa.y + 4.2} textAnchor="middle" fontSize="2.1" fill="#fff" opacity="0.9">
              {e.nome.length > 16 ? e.nome.slice(0, 15) + "…" : e.nome}
            </text>
          </g>
        ))}

        {pontosDoMapa.map((p) => (
          <g key={p.id}>
            <rect x={p.x - L / 2} y={p.y - A / 2} width={L} height={A} rx="1" fill="#fff" stroke="#8a93a1" strokeWidth="0.35" strokeDasharray="1.2 0.8" />
            <text x={p.x} y={p.y + 1} textAnchor="middle" fontSize="2.3" fill="#374151" fontWeight="600">
              {p.nome.length > 16 ? p.nome.slice(0, 15) + "…" : p.nome}
            </text>
          </g>
        ))}
      </svg>

      <div aria-live="polite">
        {selecionada ? (
          <div className="cartao expositor">
            <div className="expositor-topo">
              <Monograma expositor={selecionada} />
              <div>
                <strong>{selecionada.nome}</strong>
                <span className="suave pequeno">{selecionada.categoria}</span>
              </div>
            </div>
            <p className="pequeno" style={{ margin: 0 }}>
              {selecionada.resumo}
            </p>
            <div className="botoes">
              <Link className="botao pequeno" href={`/feira/expositores/${selecionada.slug}`}>
                Ver detalhes
              </Link>
              <Link className="botao secundario pequeno" href={`/feira/votar?banca=${selecionada.slug}`}>
                Votar
              </Link>
              <button className="botao secundario pequeno" type="button" onClick={() => setAtiva(null)}>
                Ver todas
              </button>
            </div>
          </div>
        ) : (
          <div className="lista-opcoes">
            {expositores.map((e) => (
              <button key={e.slug} type="button" onClick={() => setAtiva(e.slug)}>
                <Monograma expositor={e} tamanho="mini" />
                <span className="info">
                  <strong className="pequeno">{e.nome}</strong>
                  <span className="suave" style={{ fontSize: "0.8rem" }}>
                    {e.categoria}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
