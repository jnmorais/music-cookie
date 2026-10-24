"use client";

import Link from "next/link";
import { useState } from "react";
import { musicCookies } from "@/lib/config";

const real = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function Pedido() {
  const [qtd, setQtd] = useState<Record<string, number>>({});
  const [nome, setNome] = useState("");
  const [presente, setPresente] = useState(true);

  const itens = musicCookies.sabores.filter((s) => (qtd[s.id] ?? 0) > 0);
  const total = itens.reduce((t, s) => t + s.preco * qtd[s.id], 0);

  const texto = [
    `Olá, Music Cookies! Quero fazer um pedido${nome ? ` (${nome})` : ""}:`,
    ...itens.map((s) => `• ${qtd[s.id]}x ${s.nome} — ${real.format(s.preco * qtd[s.id])}`),
    `Total: ${real.format(total)}`,
    presente ? "É para presente: vou mandar o link do meu presente musical 🎵" : "",
  ]
    .filter(Boolean)
    .join("\n");

  const alterar = (id: string, delta: number) =>
    setQtd((q) => ({ ...q, [id]: Math.max(0, Math.min(20, (q[id] ?? 0) + delta)) }));

  return (
    <div className="cartao">
      <h2>Fazer pedido</h2>
      <p className="suave">
        Monte o pedido e envie direto para o WhatsApp do grupo. Na feira, a retirada é na banca da Music Cookies.
      </p>
      <div className="grade" style={{ marginBottom: 16 }}>
        {musicCookies.sabores.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
            <span>
              <strong>{s.nome}</strong>
              <br />
              <span className="suave pequeno">{real.format(s.preco)}</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button className="botao contorno pequeno" type="button" onClick={() => alterar(s.id, -1)} aria-label={`Remover ${s.nome}`}>
                −
              </button>
              <span aria-live="polite" style={{ minWidth: 20, textAlign: "center", fontWeight: 700 }}>
                {qtd[s.id] ?? 0}
              </span>
              <button className="botao contorno pequeno" type="button" onClick={() => alterar(s.id, 1)} aria-label={`Adicionar ${s.nome}`}>
                +
              </button>
            </span>
          </div>
        ))}
      </div>
      <div className="campo">
        <label htmlFor="pedido-nome">Seu nome</label>
        <input id="pedido-nome" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={40} autoComplete="name" />
      </div>
      <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input type="checkbox" checked={presente} onChange={(e) => setPresente(e.target.checked)} /> É para presente (com
        etiqueta musical)
      </label>
      <p className="preco">Total: {real.format(total)}</p>
      <div className="botoes">
        {musicCookies.whatsapp ? (
          <a
            className="botao verde"
            aria-disabled={!itens.length}
            href={itens.length ? `https://wa.me/${musicCookies.whatsapp}?text=${encodeURIComponent(texto)}` : undefined}
            target="_blank"
            rel="noreferrer"
          >
            Enviar pedido pelo WhatsApp
          </a>
        ) : (
          <button
            className="botao verde"
            type="button"
            disabled={!itens.length}
            onClick={() => navigator.clipboard?.writeText(texto).then(() => alert("Pedido copiado! Cole na conversa com a Music Cookies."))}
          >
            Copiar pedido
          </button>
        )}
        {presente && (
          <Link className="botao contorno" href="/music-cookies/presente">
            Criar o presente musical
          </Link>
        )}
      </div>
    </div>
  );
}
