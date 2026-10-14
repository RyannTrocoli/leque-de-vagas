"use client";

import { useActionState } from "react";
import { criarVaga } from "@/app/vagas/nova/acoes";
import { ESTADO_INICIAL } from "@/lib/tipos";

type EmpresaDaLista = { slug: string; nome: string };

export default function FormularioNovaVaga({ empresas }: { empresas: EmpresaDaLista[] }) {
  const [estado, acao] = useActionState(criarVaga, ESTADO_INICIAL);

  return (
    <form action={acao} className="formulario" noValidate>
      {estado.mensagem && <p role="alert">{estado.mensagem}</p>}
      <label>
        Titulo da vaga
        <input name="titulo" defaultValue={estado.valores.titulo} />
        {estado.erros.titulo && <small>{estado.erros.titulo}</small>}
      </label>
      <label>
        Empresa
        <select name="empresaSlug" defaultValue={estado.valores.empresaSlug ?? ""}>
          <option value="">Selecione</option>
          {empresas.map((empresa) => <option key={empresa.slug} value={empresa.slug}>{empresa.nome}</option>)}
        </select>
        {estado.erros.empresaSlug && <small>{estado.erros.empresaSlug}</small>}
      </label>
      <label>
        Area
        <select name="area" defaultValue={estado.valores.area ?? ""}>
          <option value="">Selecione</option>
          {["Front-end", "Back-end", "Dados", "Mobile", "QA", "Design"].map((area) => <option key={area} value={area}>{area}</option>)}
        </select>
        {estado.erros.area && <small>{estado.erros.area}</small>}
      </label>
      <label>
        Senioridade
        <select name="senioridade" defaultValue={estado.valores.senioridade ?? ""}>
          <option value="">Selecione</option>
          {["Estagio", "Junior", "Pleno"].map((nivel) => <option key={nivel} value={nivel}>{nivel}</option>)}
        </select>
        {estado.erros.senioridade && <small>{estado.erros.senioridade}</small>}
      </label>
      <label>
        Modelo de trabalho ou cidade
        <input name="local" defaultValue={estado.valores.local} placeholder="Ex.: Remoto" />
        {estado.erros.local && <small>{estado.erros.local}</small>}
      </label>
      <label>
        <input type="checkbox" name="aceitaIniciante" defaultChecked={estado.valores.aceitaIniciante === "true"} />
        Aceita pessoas sem experiencia profissional na area
      </label>
      <label>
        Descricao
        <textarea name="descricao" rows={8} defaultValue={estado.valores.descricao} />
        {estado.erros.descricao && <small>{estado.erros.descricao}</small>}
      </label>
      <button type="submit">Publicar vaga</button>
    </form>
  );
}
