import type { Vaga } from "@/lib/tipos";

type EmpresaDaFonte = { slug: string; nome: string; sobre: string; site: string };
type CandidaturaRecebida = { vagaId: string; nome: string; email: string; habilidades: string[] };

const vagasCriadas: Vaga[] = [];
const idsArquivados = new Set<string>();
const empresasEditadas = new Map<string, EmpresaDaFonte>();
const candidaturasRecebidas: CandidaturaRecebida[] = [];

const FONTE_DADOS =
  process.env.FONTE_DADOS ??
  "https://raw.githubusercontent.com/ryann-trocoli/leque-de-vagas/main/dados";

async function buscarJson<T>(arquivo: string, revalidate: number, tag: string): Promise<T> {
  const resposta = await fetch(`${FONTE_DADOS}/${arquivo}`, {
    // Vagas usam 60 s para aparecerem logo; perfis de empresa mudam menos.
    next: { revalidate, tags: [tag] },
  });
  if (!resposta.ok) {
    throw new Error(`Nao foi possivel carregar ${arquivo} (${resposta.status}).`);
  }
  return (await resposta.json()) as T;
}

export async function listarVagas(): Promise<Vaga[]> {
  const publicadas = await buscarJson<Vaga[]>("vagas.json", 60, "vagas");
  return [...vagasCriadas, ...publicadas].filter((vaga) => !idsArquivados.has(vaga.id));
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  return (await listarVagas()).find((vaga) => vaga.id === id);
}

export async function listarEmpresas(): Promise<EmpresaDaFonte[]> {
  const publicadas = await buscarJson<EmpresaDaFonte[]>("empresas.json", 3600, "empresas");
  const porSlug = new Map(publicadas.map((empresa) => [empresa.slug, empresa]));
  for (const empresa of empresasEditadas.values()) porSlug.set(empresa.slug, empresa);
  return [...porSlug.values()];
}

export async function buscarEmpresa(slug: string): Promise<EmpresaDaFonte | undefined> {
  return (await listarEmpresas()).find((empresa) => empresa.slug === slug);
}

export function guardarVaga(vaga: Vaga): void {
  vagasCriadas.push(vaga);
}

export function arquivarVaga(id: string): void {
  idsArquivados.add(id);
}

export function guardarCandidatura(candidatura: CandidaturaRecebida): void {
  candidaturasRecebidas.push(candidatura);
}

export function guardarEmpresa(empresa: EmpresaDaFonte): void {
  empresasEditadas.set(empresa.slug, empresa);
}
