"use client";

import { useState } from "react";
import { arquivar } from "@/app/vagas/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import CardDeVaga from "@/components/CardDeVaga";
import Filtros from "@/components/Filtros";
import type { Vaga } from "@/lib/tipos";

export default function MuralDeVagas({ vagas }: { vagas: Vaga[] }) {
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("Todas");

  const areas = ["Todas", ...Array.from(new Set(vagas.map((vaga) => vaga.area))).sort()];
  const termo = busca.trim().toLocaleLowerCase("pt-BR");
  const visiveis = vagas.filter((vaga) => {
    const bateArea = area === "Todas" || vaga.area === area;
    const conteudo = `${vaga.titulo} ${vaga.empresa} ${vaga.local} ${vaga.senioridade}`.toLocaleLowerCase("pt-BR");
    return bateArea && conteudo.includes(termo);
  });
  const aceitamIniciante = visiveis.filter((vaga) => vaga.aceitaIniciante).length;

  return (
    <div>
      <Filtros busca={busca} aoMudarBusca={setBusca} area={area} aoMudarArea={setArea} areas={areas} />
      <div className="resultado-resumo" aria-live="polite">
        <strong>{visiveis.length} de {vagas.length} vagas</strong>
        <span>{aceitamIniciante} aceitam iniciantes</span>
      </div>
      {visiveis.length ? (
        <div className="grade-vagas">
          {visiveis.map((vaga) => (
            <CardDeVaga
              vaga={vaga}
              key={vaga.id}
              acao={
                <form action={arquivar}>
                  <input type="hidden" name="id" value={vaga.id} />
                  <BotaoDeEnviar texto="Arquivar" pendente="Arquivando…" className="botao-texto perigo" />
                </form>
              }
            />
          ))}
        </div>
      ) : (
        <div className="estado-vazio"><strong>Nenhuma vaga encontrada.</strong><span>Tente outro termo ou escolha uma area diferente.</span></div>
      )}
    </div>
  );
}
