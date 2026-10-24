"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Monograma from "@/components/Monograma";
import { expositores } from "@/lib/expositores";

const CHAVE_VOTANTE = "feira-votante";
const CHAVE_VOTOU = "feira-votou";

function idDoAparelho() {
  try {
    let id = localStorage.getItem(CHAVE_VOTANTE);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(CHAVE_VOTANTE, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

const rotulos = ["", "Ruim", "Regular", "Boa", "Muito boa", "Excelente"];

export default function Votacao() {
  const [banca, setBanca] = useState("");
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [estado, setEstado] = useState<"livre" | "enviando" | "feito">("livre");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const inicial = new URLSearchParams(window.location.search).get("banca");
    if (inicial && expositores.some((e) => e.slug === inicial)) setBanca(inicial);
    try {
      if (localStorage.getItem(CHAVE_VOTOU)) setEstado("feito");
    } catch {}
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (!banca) return setErro("Selecione uma banca.");
    if (!nota) return setErro("Selecione uma nota para o evento.");
    setEstado("enviando");
    try {
      const res = await fetch("/api/feira/votos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votante: idDoAparelho(), expositor: banca, nota, comentario }),
      });
      const dados = await res.json();
      if (res.ok || res.status === 409) {
        try {
          localStorage.setItem(CHAVE_VOTOU, banca);
        } catch {}
        setEstado("feito");
        if (res.status === 409) setErro(dados.erro);
      } else {
        setErro(dados.erro ?? "Não foi possível registrar o voto.");
        setEstado("livre");
      }
    } catch {
      setErro("Sem conexão. Tente novamente em instantes.");
      setEstado("livre");
    }
  }

  if (estado === "feito") {
    return (
      <div className="cartao" style={{ textAlign: "center", padding: 40 }}>
        <CircleCheck size={40} strokeWidth={1.5} style={{ color: "var(--sucesso)" }} aria-hidden />
        <h2 style={{ marginTop: 12 }}>Voto registrado</h2>
        <p className="suave">{erro || "Valeu por participar!"}</p>
        <div className="botoes" style={{ justifyContent: "center" }}>
          <Link className="botao" href="/feira/resultados">
            Ver painel
          </Link>
          <Link className="botao secundario" href="/feira">
            Voltar para a feira
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="cartao" onSubmit={enviar}>
      <fieldset className="campo">
        <legend style={{ marginBottom: 8 }}>1. Sua banca favorita</legend>
        <div className="lista-opcoes">
          {expositores.map((e) => (
            <label key={e.slug}>
              <input type="radio" name="banca" value={e.slug} checked={banca === e.slug} onChange={() => setBanca(e.slug)} />
              <Monograma expositor={e} tamanho="mini" />
              <span className="info">
                <strong className="pequeno">{e.nome}</strong>
                <span className="suave" style={{ fontSize: "0.8rem" }}>
                  {e.categoria}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="campo">
        <legend style={{ marginBottom: 8 }}>2. Que nota você dá para a feira?</legend>
        <div className="segmentado">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n}>
              <input type="radio" name="nota" value={n} checked={nota === n} onChange={() => setNota(n)} aria-label={`${n} — ${rotulos[n]}`} />
              <span style={{ minWidth: 44 }}>{n}</span>
            </label>
          ))}
        </div>
        <span className="ajuda">{nota ? `${nota} de 5 — ${rotulos[nota]}` : "1 = ruim · 5 = excelente"}</span>
      </fieldset>

      <div className="campo">
        <label htmlFor="comentario">3. Quer deixar um comentário? (opcional)</label>
        <textarea
          id="comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value.slice(0, 280))}
          placeholder="Do que você mais gostou? O que dá para melhorar?"
        />
        <span className="ajuda">Só a organização vê os comentários.</span>
      </div>

      {erro && (
        <p className="aviso erro" role="alert">
          {erro}
        </p>
      )}
      <button className="botao" type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Enviar voto"}
      </button>
    </form>
  );
}
