import type { Metadata } from "next";
import AbrirPresente from "./AbrirPresente";

export const metadata: Metadata = {
  title: "Você recebeu um presente musical",
  description: "Abra seu presente da Music Cookies: uma mensagem e uma música escolhidas para você.",
  robots: { index: false },
};

export default function PaginaAbrirPresente() {
  return <AbrirPresente />;
}
