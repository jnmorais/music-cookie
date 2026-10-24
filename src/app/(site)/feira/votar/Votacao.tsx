"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    if (!banca) return setErro("Escolha uma banca.");
    if (!nota) return setErro("Dê uma nota para a feira.");
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
        setErro(dados.erro ?? "Algo deu errado.");
        setEstado("livre");
      }
    } catch {
      setErro("Sem conexão. Tente de novo em instantes.");
      setEstado("livre");
    }
  }

  if (estado === "feito") {
    return (
      <div className="cartao" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }} aria-hidden>
          💜
        </div>
        <h2>Voto registrado. Obrigado!</h2>
        {erro && <p className="suave">{erro}</p>}
        <div className="botoes" style={{ justifyContent: "center" }}>
          <Link className="botao feira" href="/feira/resultados">
            Ver painel ao vivo
          </Link>
          <Link className="botao contorno" href="/feira">
            Voltar à feira
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="cartao" onSubmit={enviar}>
      <fieldset className="campo">
        <legend>Banca favorita</legend>
        <div className="opcoes">
          {expositores.map((e) => (
            <label key={e.slug} className="opcao">
              <input type="radio" name="banca" value={e.slug} checked={banca === e.slug} onChange={() => setBanca(e.slug)} />
              <span>
                {e.emoji} {e.nome}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="campo">
        <legend>Nota para a feira</legend>
        <div className="estrelas" role="radiogroup" aria-label="Nota de 1 a 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={nota === n}
              aria-label={`${n} — ${rotulos[n]}`}
              className={n <= nota ? "ligada" : ""}
              onClick={() => setNota(n)}
            >
              ★
            </button>
          ))}
        </div>
        <span className="ajuda">{nota ? rotulos[nota] : "Toque nas estrelas"}</span>
      </fieldset>

      <div className="campo">
        <label htmlFor="comentario">Comentário ou sugestão (opcional)</label>
        <textarea
          id="comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value.slice(0, 280))}
          placeholder="O que você mais gostou? O que podemos melhorar?"
        />
        <span className="ajuda">Comentários são lidos pela organização e não aparecem publicamente.</span>
      </div>

      {erro && (
        <p className="aviso erro" role="alert">
          {erro}
        </p>
      )}
      <button className="botao verde" type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Enviar voto"}
      </button>
    </form>
  );
}
