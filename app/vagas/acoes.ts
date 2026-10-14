"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { arquivarVaga } from "@/lib/api";
import { EsquemaDoArquivo } from "@/lib/esquemas";

export async function arquivar(dados: FormData): Promise<void> {
  const resultado = EsquemaDoArquivo.safeParse({ id: dados.get("id") });
  if (!resultado.success) return;

  await arquivarVaga(resultado.data.id);
  revalidateTag("vagas", "max");
  revalidatePath("/vagas");
}
