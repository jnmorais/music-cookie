"use client";

import { useEffect, useState } from "react";
import QrCode from "@/components/QrCode";
import { useOrigem } from "@/components/useOrigem";
import { buscarExpositor } from "@/lib/expositores";
import type { Resultados } from "@/lib/armazenamento";

type Resposta = Resultados & { admin: boolean; persistente: boolean };

export default function Painel() {
  const origem = useOrigem();
  const [dados, setDados] = useState<Resposta | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    // ?chave=... libera a leitura dos comentários para a organização
    const chave = new URLSearchParams(window.location.search).get("chave");
    const url = `/api/feira/resultados${chave ? `?chave=${encodeURIComponent(chave)}` : ""}`;
    let ativo = true;
    const carregar = () =>
      fetch(url, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => {
          if (!ativo) return;
          setDados(d);
          setErro(false);
        })
        .catch(() => ativo && setErro(true));
    carregar();
    const id = setInterval(carregar, 10000);
    return () => {
      ativo = false;
      clearInterval(id);
    };
  }, []);

  if (!dados) return <p className="suave">{erro ? "Não foi possível carregar o painel." : "Carregando…"}</p>;

  const maximo = Math.max(1, ...dados.porExpositor.map((e) => e.votos));

  return (
    <>
      {!dados.persistente && (
        <p className="aviso" style={{ marginBottom: 16 }}>
          Modo demonstração: votos guardados só em memória. Conecte o Upstash Redis na Vercel para salvar de verdade.
        </p>
      )}
      <div className="grade-2">
        <div className="cartao">
          <h2 style={{ fontSize: "1.3rem" }}>Ranking das bancas</h2>
          <ol className="ranking">
            {dados.porExpositor.map((r, i) => {
              const e = buscarExpositor(r.slug)!;
              return (
                <li key={r.slug}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <span>
                      <strong>{i + 1}º</strong> {e.emoji} {e.nome}
                    </span>
                    <strong style={{ fontVariantNumeric: "tabular-nums" }}>
                      {r.votos} {r.votos === 1 ? "voto" : "votos"}
                    </strong>
                  </div>
                  <div className="barra">
                    <div style={{ width: `${(r.votos / maximo) * 100}%`, background: e.cor }} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div className="grade" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="cartao">
              <div className="numero-grande">{dados.totalVotos}</div>
              <div className="suave">votos</div>
            </div>
            <div className="cartao">
              <div className="numero-grande">{dados.mediaFeira ?? "–"}</div>
              <div className="suave">nota da feira ★</div>
            </div>
          </div>
          <div className="cartao" style={{ textAlign: "center" }}>
            <strong>Vote também!</strong>
            {origem && <QrCode valor={`${origem}/feira/votar`} className="qr" alt="QR Code para votar" tamanho={400} />}
            <div className="suave pequeno">{origem.replace(/^https?:\/\//, "")}/feira/votar</div>
          </div>
        </div>
      </div>

      {dados.admin && dados.comentarios && (
        <div className="cartao" style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.3rem" }}>Comentários ({dados.comentarios.length})</h2>
          <ul style={{ paddingLeft: 18 }}>
            {dados.comentarios.map((c, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <span className="suave pequeno">
                  {new Date(c.em).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} ·{" "}
                  {buscarExpositor(c.expositor)?.nome} · {"★".repeat(c.nota)}
                </span>
                <br />
                {c.texto}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
