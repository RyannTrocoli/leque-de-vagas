"use server";

import { revalidatePath } from "next/cache";
import { guardarCandidatura } from "@/lib/api";
import { EsquemaDaCandidatura } from "@/lib/esquemas";
import type { Estado } from "@/lib/tipos";

export async function enviarCandidatura(_: Estado, dados: FormData): Promise<Estado> {
  const valores = {
    vagaId: String(dados.get("vagaId") ?? ""),
    nome: String(dados.get("nome") ?? ""),
    email: String(dados.get("email") ?? ""),
    habilidades: dados.getAll("habilidades").map(String),
  };

  const resultado = EsquemaDaCandidatura.safeParse(valores);
  if (!resultado.success) {
    const erros = resultado.error.flatten().fieldErrors;
    return {
      ok: false,
      erros: Object.fromEntries(
        Object.entries(erros).map(([campo, mensagens]) => [campo, mensagens?.[0] ?? "Valor inválido."]),
      ),
      valores: {
        vagaId: valores.vagaId,
        nome: valores.nome,
        email: valores.email,
        habilidades: valores.habilidades.join(","),
      },
      mensagem: "Revise os campos destacados.",
    };
  }

  const guardou = await guardarCandidatura(resultado.data);
  if (!guardou) {
    return {
      ok: false,
      erros: {},
      valores: {
        vagaId: resultado.data.vagaId,
        nome: resultado.data.nome,
        email: resultado.data.email,
        habilidades: resultado.data.habilidades.join(","),
      },
      mensagem: "Essa vaga não está mais disponível.",
    };
  }

  revalidatePath(`/vagas/${resultado.data.vagaId}`);

  return {
    ok: true,
    erros: {},
    valores: {
      vagaId: resultado.data.vagaId,
      nome: resultado.data.nome,
      email: resultado.data.email,
      habilidades: resultado.data.habilidades.join(","),
    },
    mensagem: "Candidatura enviada com sucesso.",
  };
}
