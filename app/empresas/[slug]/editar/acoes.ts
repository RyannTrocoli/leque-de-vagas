"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { guardarEmpresa } from "@/lib/api";
import { EsquemaDaEmpresa } from "@/lib/esquemas";
import type { Estado } from "@/lib/tipos";

// Dois parametros: com useActionState o Next chama (estadoAnterior, formData).
export async function salvarEmpresa(_: Estado, dados: FormData): Promise<Estado> {
  const valores = {
    slug: String(dados.get("slug") ?? ""),
    nome: String(dados.get("nome") ?? ""),
    sobre: String(dados.get("sobre") ?? ""),
    site: String(dados.get("site") ?? ""),
  };

  // Toda Server Action e um endereco publico: valida antes de usar qualquer dado.
  const resultado = EsquemaDaEmpresa.safeParse(valores);
  if (!resultado.success) {
    const erros = resultado.error.flatten().fieldErrors;
    return {
      ok: false,
      erros: Object.fromEntries(Object.entries(erros).map(([campo, mensagens]) => [campo, mensagens?.[0] ?? "Valor invalido."])),
      valores,
      mensagem: "Revise os campos destacados.",
    };
  }

  await guardarEmpresa(resultado.data);

  revalidateTag("empresas", "max");
  // A listagem e o perfil sao rotas com cache proprio: avisar so uma deixaria
  // a outra mostrando o nome antigo.
  revalidatePath("/empresas");
  revalidatePath(`/empresas/${resultado.data.slug}`);

  // Sem redirect: a pessoa continua editando, entao o sucesso aparece no lugar.
  return { ok: true, erros: {}, valores, mensagem: "Perfil atualizado." };
}
