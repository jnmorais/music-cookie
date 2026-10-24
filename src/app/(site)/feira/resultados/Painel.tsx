"use client";

import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import Monograma from "@/components/Monograma";
import QrCode from "@/components/QrCode";
import { useOrigem } from "@/components/useOrigem";
import { buscarExpositor } from "@/lib/expositores";
import type { Resultados } from "@/lib/armazenamento";

type Resposta = Resultados & { admin: boolean; persistente: boolean };

const hora = (ms: number) => new Date(ms).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export default function Painel() {
  const origem = useOrigem();
  const [dados, setDados] = useState<Resposta | null>(null);
  const [atualizado, setAtualizado] = useState<number | null>(null);
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
          setAtualizado(Date.now());
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
  const lider = dados.totalVotos ? buscarExpositor(dados.porExpositor[0].slug) : null;

  return (
    <>
      {!dados.persistente && (
        <p className="aviso">
          <Info size={16} aria-hidden />
          <span>Ambiente de demonstração: os votos ficam em memória. Configure o Upstash Redis na Vercel para persistência.</span>
        </p>
      )}

      <div className="estatisticas" style={{ marginBottom: 24 }}>
        <div>
          <div className="valor">{dados.totalVotos}</div>
          <div className="rotulo">Votos registrados</div>
        </div>
        <div>
          <div className="valor">{dados.mediaFeira !== null ? dados.mediaFeira.toFixed(1).replace(".", ",") : "—"}</div>
          <div className="rotulo">Avaliação média do evento (1 a 5)</div>
        </div>
        <div>
          <div className="valor" style={{ fontSize: "1.25rem", paddingTop: 6 }}>
            {lider?.nome ?? "—"}
          </div>
          <div className="rotulo">Banca em 1º lugar</div>
        </div>
        <div>
          <div className="valor" style={{ fontSize: "1.25rem", paddingTop: 6 }}>
            {atualizado ? hora(atualizado) : "—"}
          </div>
          <div className="rotulo">Última atualização</div>
        </div>
      </div>

      <div className="layout-lateral">
        <div className="tabela-wrap">
          <table className="tabela">
            <thead>
              <tr>
                <th style={{ width: 56 }}>#</th>
                <th>Banca</th>
                <th style={{ width: "35%" }}>Participação</th>
                <th className="num">Votos</th>
              </tr>
            </thead>
            <tbody>
              {dados.porExpositor.map((r, i) => {
                const e = buscarExpositor(r.slug)!;
                const pct = dados.totalVotos ? Math.round((r.votos / dados.totalVotos) * 100) : 0;
                return (
                  <tr key={r.slug}>
                    <td className="suave" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Monograma expositor={e} tamanho="mini" />
                        <span>
                          <strong style={{ fontWeight: 600 }}>{e.nome}</strong>
                          <br />
                          <span className="suave" style={{ fontSize: "0.8rem" }}>
                            {e.categoria}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="barra" style={{ flex: 1 }}>
                          <div style={{ width: `${(r.votos / maximo) * 100}%`, background: e.cor }} />
                        </span>
                        <span className="suave" style={{ fontSize: "0.8rem", minWidth: 34, textAlign: "right" }}>
                          {pct}%
                        </span>
                      </span>
                    </td>
                    <td className="num" style={{ fontWeight: 600 }}>
                      {r.votos}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <aside className="cartao" style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "0.95rem" }}>Participe da votação</h3>
          <p className="suave pequeno" style={{ margin: 0 }}>
            Aponte a câmera do celular para o código.
          </p>
          {origem && <QrCode valor={`${origem}/feira/votar`} alt="QR Code para votar" tamanho={400} className="qr" style={{ width: 200, height: 200, margin: "16px auto" }} />}
          <div className="suave pequeno" style={{ wordBreak: "break-all" }}>
            {origem.replace(/^https?:\/\//, "")}/feira/votar
          </div>
        </aside>
      </div>

      {dados.admin && dados.comentarios && (
        <div style={{ marginTop: 32 }}>
          <div className="cartao-titulo">
            <h2 style={{ fontSize: "1.15rem" }}>Comentários</h2>
            <span className="selo">Restrito à organização · {dados.comentarios.length}</span>
          </div>
          <div className="tabela-wrap">
            <table className="tabela">
              <thead>
                <tr>
                  <th style={{ width: 80 }}>Hora</th>
                  <th style={{ width: 180 }}>Banca</th>
                  <th className="num" style={{ width: 70 }}>
                    Nota
                  </th>
                  <th>Comentário</th>
                </tr>
              </thead>
              <tbody>
                {dados.comentarios.map((c, i) => (
                  <tr key={i}>
                    <td className="suave">{hora(c.em)}</td>
                    <td>{buscarExpositor(c.expositor)?.nome}</td>
                    <td className="num">{c.nota}</td>
                    <td>{c.texto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
