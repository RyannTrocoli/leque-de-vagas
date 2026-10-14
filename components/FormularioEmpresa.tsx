"use client";

import { useActionState } from "react";
import { salvarEmpresa } from "@/app/empresas/[slug]/editar/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import { ESTADO_INICIAL, type Empresa } from "@/lib/tipos";

export default function FormularioEmpresa({ empresa }: { empresa: Empresa }) {
  const [estado, acao] = useActionState(salvarEmpresa, ESTADO_INICIAL);

  return (
    <form action={acao} className="formulario" noValidate>
      {/* O slug nao e editavel: ele liga a empresa as vagas por empresaSlug. */}
      <input type="hidden" name="slug" value={empresa.slug} />
      {estado.mensagem && <p className={estado.ok ? "aviso sucesso" : "aviso erro-geral"} role="status">{estado.mensagem}</p>}

      <label>
        Nome
        <input name="nome" defaultValue={estado.valores.nome ?? empresa.nome} />
        {estado.erros.nome && <small>{estado.erros.nome}</small>}
      </label>
      <label>
        Sobre
        <textarea name="sobre" rows={8} defaultValue={estado.valores.sobre ?? empresa.sobre} />
        {estado.erros.sobre && <small>{estado.erros.sobre}</small>}
      </label>
      <label>
        Site
        <input name="site" type="url" defaultValue={estado.valores.site ?? empresa.site} />
        {estado.erros.site && <small>{estado.erros.site}</small>}
      </label>

      <BotaoDeEnviar texto="Salvar perfil" pendente="Salvando…" className="botao" />
    </form>
  );
}
