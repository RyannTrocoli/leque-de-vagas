import type { Vaga } from "@/lib/tipos";

const FONTE_DADOS =
  process.env.FONTE_DADOS ??
  "https://raw.githubusercontent.com/ryann-trocoli/leque-de-vagas/main/dados";

export async function listarVagas(): Promise<Vaga[]> {
  const resposta = await fetch(`${FONTE_DADOS}/vagas.json`, {
    // Um minuto equilibra atualizacoes visiveis com menos requisicoes ao JSON publico.
    next: { revalidate: 60, tags: ["vagas"] },
  });
  if (!resposta.ok) {
    throw new Error(`Nao foi possivel carregar as vagas (${resposta.status}).`);
  }
  return (await resposta.json()) as Vaga[];
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  return (await listarVagas()).find((vaga) => vaga.id === id);
}
