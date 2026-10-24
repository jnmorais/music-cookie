"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Tema = "claro" | "escuro";

export default function AlternarTema() {
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    setTema(document.documentElement.dataset.tema === "escuro" ? "escuro" : "claro");
  }, []);

  function alternar() {
    const novo: Tema = tema === "escuro" ? "claro" : "escuro";
    document.documentElement.dataset.tema = novo;
    try {
      localStorage.setItem("tema", novo);
    } catch {
      // sem armazenamento: o tema vale só nesta visita
    }
    setTema(novo);
  }

  const escuro = tema === "escuro";
  return (
    <button
      type="button"
      className="icone-botao"
      onClick={alternar}
      aria-label={escuro ? "Usar tema claro" : "Usar tema escuro"}
      title={escuro ? "Tema claro" : "Tema escuro"}
    >
      {escuro ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
