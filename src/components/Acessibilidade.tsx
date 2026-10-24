"use client";

import { Contrast, Type } from "lucide-react";
import { useEffect, useState } from "react";

function ler(chave: string) {
  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}

function salvar(chave: string, valor: string | null) {
  try {
    if (valor) localStorage.setItem(chave, valor);
    else localStorage.removeItem(chave);
  } catch {
    // armazenamento indisponível: preferência vale só nesta visita
  }
}

export default function Acessibilidade() {
  const [fonteGrande, setFonteGrande] = useState(false);
  const [contraste, setContraste] = useState(false);

  useEffect(() => {
    setFonteGrande(ler("a11y-fonte") === "grande");
    setContraste(ler("a11y-contraste") === "alto");
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    if (fonteGrande) raiz.dataset.fonte = "grande";
    else delete raiz.dataset.fonte;
    if (contraste) raiz.dataset.contraste = "alto";
    else delete raiz.dataset.contraste;
  }, [fonteGrande, contraste]);

  return (
    <div className="acessibilidade" role="group" aria-label="Acessibilidade">
      <button
        type="button"
        className="icone-botao"
        aria-pressed={fonteGrande}
        aria-label="Aumentar o tamanho do texto"
        title="Aumentar o tamanho do texto"
        onClick={() => {
          salvar("a11y-fonte", fonteGrande ? null : "grande");
          setFonteGrande(!fonteGrande);
        }}
      >
        <Type size={16} />
      </button>
      <button
        type="button"
        className="icone-botao"
        aria-pressed={contraste}
        aria-label="Alto contraste"
        title="Alto contraste"
        onClick={() => {
          salvar("a11y-contraste", contraste ? null : "alto");
          setContraste(!contraste);
        }}
      >
        <Contrast size={16} />
      </button>
    </div>
  );
}
