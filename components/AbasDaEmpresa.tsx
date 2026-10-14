"use client";

import { useState } from "react";
import CardDeVaga from "@/components/CardDeVaga";
import type { Vaga } from "@/lib/tipos";

// Um estado so, guardando o nome da aba. Dois booleanos (mostrarSobre/mostrarVagas)
// poderiam ficar os dois verdadeiros ou os dois falsos; um texto nao tem como mentir.
type Aba = "sobre" | "vagas";

export default function AbasDaEmpresa({ sobre, vagas }: { sobre: string; vagas: Vaga[] }) {
  const [aba, setAba] = useState<Aba>("sobre");

  return (
    <div className="abas">
      <div className="abas-botoes" role="tablist" aria-label="Conteudo da empresa">
        <button type="button" role="tab" aria-selected={aba === "sobre"} className={aba === "sobre" ? "ativa" : ""} onClick={() => setAba("sobre")}>
          Sobre
        </button>
        {/* A contagem vem da prop: numero que da para contar nao se guarda em estado. */}
        <button type="button" role="tab" aria-selected={aba === "vagas"} className={aba === "vagas" ? "ativa" : ""} onClick={() => setAba("vagas")}>
          Vagas ({vagas.length})
        </button>
      </div>

      {aba === "sobre" ? (
        <div className="texto-longo" role="tabpanel">
          {sobre.split("\n").filter(Boolean).map((paragrafo, indice) => <p key={indice}>{paragrafo}</p>)}
        </div>
      ) : vagas.length ? (
        <div className="grade-vagas" role="tabpanel">
          {vagas.map((vaga) => <CardDeVaga vaga={vaga} key={vaga.id} />)}
        </div>
      ) : (
        <p className="estado-vazio" role="tabpanel">Esta empresa nao tem vagas abertas no momento.</p>
      )}
    </div>
  );
}
