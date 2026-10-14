"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buscarEmpresa, guardarVaga } from "@/lib/api";
import { EsquemaDaVaga } from "@/lib/esquemas";
import type { Estado, Vaga } from "@/lib/tipos";

export async function criarVaga(_: Estado, dados: FormData): Promise<Estado> {
  const valores = {
    titulo: String(dados.get("titulo") ?? ""),
    empresaSlug: String(dados.get("empresaSlug") ?? ""),
    area: String(dados.get("area") ?? ""),
    senioridade: String(dados.get("senioridade") ?? ""),
    local: String(dados.get("local") ?? ""),
    aceitaIniciante: dados.get("aceitaIniciante") === "on",
    descricao: String(dados.get("descricao") ?? ""),
  };
  const resultado = EsquemaDaVaga.safeParse(valores);
  const valoresParaEstado = Object.fromEntries(
    Object.entries(valores).map(([campo, valor]) => [campo, String(valor)]),
  );

  if (!resultado.success) {
    const erros = resultado.error.flatten().fieldErrors;
    return {
      ok: false,
      erros: Object.fromEntries(
        Object.entries(erros).map(([campo, mensagens]) => [campo, mensagens?.[0] ?? "Valor invalido."]),
      ),
      valores: valoresParaEstado,
      mensagem: "Revise os campos destacados.",
    };
  }

  const empresa = await buscarEmpresa(resultado.data.empresaSlug);
  if (!empresa) {
    return {
      ok: false,
      erros: { empresaSlug: "Escolha uma empresa existente." },
      valores: valoresParaEstado,
    };
  }

  const vaga: Vaga = {
    id: crypto.randomUUID(),
    titulo: resultado.data.titulo,
    empresa: empresa.nome,
    empresaSlug: empresa.slug,
    area: resultado.data.area,
    senioridade: resultado.data.senioridade,
    local: resultado.data.local,
    aceitaIniciante: resultado.data.aceitaIniciante,
    descricao: resultado.data.descricao,
    publicadaEm: new Date().toISOString().slice(0, 10),
  };

  await guardarVaga(vaga);
  revalidatePath("/vagas");
  redirect(`/vagas/${vaga.id}`);
}
