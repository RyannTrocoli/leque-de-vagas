"use client";

import { useActionState, useState } from "react";
import { enviarCandidatura } from "@/app/vagas/[id]/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import { ESTADO_INICIAL } from "@/lib/tipos";

const HABILIDADES = ["HTML", "CSS", "JavaScript", "React", "SQL", "Git", "Python", "Testes"];

type Props = {
  vagaId: string;
  tituloDaVaga: string;
};

export default function FormularioDeCandidatura({ vagaId, tituloDaVaga }: Props) {
  const [estado, acao] = useActionState(enviarCandidatura, ESTADO_INICIAL);
  const [corrigindo, setCorrigindo] = useState(false);
  const habilidadesSelecionadas = (estado.valores.habilidades ?? "").split(",").filter(Boolean);

  if (estado.ok && !corrigindo) {
    return (
      <section className="bloco-detalhe">
        <p className="aviso sucesso" role="status">{estado.mensagem}</p>
        <h2>Candidatura recebida</h2>
        <p>
          <strong>{estado.valores.nome}</strong>, sua candidatura para <strong>{tituloDaVaga}</strong> foi registrada.
        </p>
        <p>Você informou {habilidadesSelecionadas.length} habilidade(s).</p>
        <button className="botao botao-secundario" type="button" onClick={() => setCorrigindo(true)}>
          Corrigir alguma coisa
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2>Candidate-se</h2>
      <form action={acao} className="formulario" noValidate>
        <input type="hidden" name="vagaId" value={vagaId} />

        {estado.mensagem && !estado.ok && (
          <p className="aviso erro-geral" role="alert">{estado.mensagem}</p>
        )}

        <label>
          Nome
          <input name="nome" autoComplete="name" defaultValue={estado.valores.nome} />
          {estado.erros.nome && <small>{estado.erros.nome}</small>}
        </label>

        <label>
          E-mail
          <input name="email" type="email" autoComplete="email" defaultValue={estado.valores.email} />
          {estado.erros.email && <small>{estado.erros.email}</small>}
        </label>

        <fieldset className="campo">
          <legend>Habilidades</legend>
          <div className="chips">
            {HABILIDADES.map((habilidade) => (
              <label className="chip" key={habilidade}>
                <input
                  type="checkbox"
                  name="habilidades"
                  value={habilidade}
                  defaultChecked={habilidadesSelecionadas.includes(habilidade)}
                />
                {habilidade}
              </label>
            ))}
          </div>
          {estado.erros.habilidades && <small className="erro-campo">{estado.erros.habilidades}</small>}
        </fieldset>

        <BotaoDeEnviar texto="Enviar candidatura" pendente="Enviando…" className="botao" />
      </form>
    </section>
  );
}
