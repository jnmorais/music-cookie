"use client";

import { useEffect, useState } from "react";

/** URL base do site (funciona em localhost, preview e produção da Vercel). */
export function useOrigem() {
  const [origem, setOrigem] = useState("");
  useEffect(() => setOrigem(window.location.origin), []);
  return origem;
}
