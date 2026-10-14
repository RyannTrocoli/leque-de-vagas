"use client";

import { useState } from "react";

export default function BotaoCopiarLink() {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    await navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
  }

  return (
    <button className="botao botao-secundario" type="button" onClick={copiar}>
      {copiado ? "✓ Link copiado" : "Copiar link"}
    </button>
  );
}
