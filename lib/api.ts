import type { Empresa, Vaga } from "@/lib/tipos";
import empresasLocais from "@/dados/empresas.json";
import vagasLocais from "@/dados/vagas.json";
import { prisma } from "@/lib/prisma";
import type { Empresa as EmpresaDoBanco, Vaga as VagaDoBanco } from "@prisma/client";

type CandidaturaRecebida = { vagaId: string; nome: string; email: string; habilidades: string[] };

const candidaturasRecebidas: CandidaturaRecebida[] = [];

const FONTE_DADOS =
  process.env.FONTE_DADOS ??
  "https://raw.githubusercontent.com/ryann-trocoli/leque-de-vagas/main/dados";

async function buscarJson<T>(arquivo: string, revalidate: number, tag: string, fallback?: T): Promise<T> {
  try {
    const resposta = await fetch(`${FONTE_DADOS}/${arquivo}`, {
      // Sessenta segundos limitam a espera por uma vaga publicada no JSON.
      next: { revalidate, tags: [tag] },
    });
    if (!resposta.ok) {
      throw new Error(`Nao foi possivel carregar ${arquivo} (${resposta.status}).`);
    }
    return (await resposta.json()) as T;
  } catch (erro) {
    if (fallback !== undefined) return fallback;
    throw erro;
  }
}

function vagaPublica(vaga: VagaDoBanco): Vaga {
  return {
    id: vaga.id,
    titulo: vaga.titulo,
    empresa: vaga.empresa,
    empresaSlug: vaga.empresaSlug,
    area: vaga.area,
    senioridade: vaga.senioridade,
    local: vaga.local,
    aceitaIniciante: vaga.aceitaIniciante,
    descricao: vaga.descricao,
    publicadaEm: vaga.publicadaEm ?? undefined,
  };
}

export async function listarVagas(): Promise<Vaga[]> {
  const [publicadas, gravadas] = await Promise.all([
    buscarJson<Vaga[]>("vagas.json", 60, "vagas", vagasLocais as Vaga[]),
    prisma.vaga.findMany({ orderBy: { criadaEm: "desc" } }),
  ]);
  const idsGravados = new Set(gravadas.map((vaga) => vaga.id));
  return [
    ...gravadas.filter((vaga) => !vaga.arquivada).map(vagaPublica),
    ...publicadas.filter((vaga) => !idsGravados.has(vaga.id)),
  ];
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  return (await listarVagas()).find((vaga) => vaga.id === id);
}

// O banco guarda campos internos (editadaEm); as telas so conhecem o contrato Empresa.
function empresaPublica(empresa: EmpresaDoBanco): Empresa {
  return { slug: empresa.slug, nome: empresa.nome, sobre: empresa.sobre, site: empresa.site };
}

function empresasPublicadas(): Promise<Empresa[]> {
  // Uma hora: perfil de empresa muda bem menos que vaga. A copia local cobre a
  // rede fora do ar e o periodo em que empresas.json ainda nao chegou na main.
  return buscarJson<Empresa[]>("empresas.json", 3600, "empresas", empresasLocais as Empresa[]);
}

// Regra registrada no DADOS.md: quando o mesmo slug existe no JSON e no banco,
// o banco vence, porque ele guarda a edicao feita pelo site.
export async function listarEmpresas(): Promise<Empresa[]> {
  const [publicadas, editadas] = await Promise.all([empresasPublicadas(), prisma.empresa.findMany()]);
  const porSlug = new Map(publicadas.map((empresa) => [empresa.slug, empresa]));
  for (const empresa of editadas) porSlug.set(empresa.slug, empresaPublica(empresa));
  return [...porSlug.values()];
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  // 1. o que foi editado pelo site tem prioridade
  const editada = await prisma.empresa.findUnique({ where: { slug } });
  if (editada) return empresaPublica(editada);

  // 2. senao, vale a publicada pelo time
  return (await empresasPublicadas()).find((empresa) => empresa.slug === slug);
}

export async function guardarVaga(vaga: Vaga): Promise<void> {
  await prisma.vaga.create({ data: vaga });
}

export async function arquivarVaga(id: string): Promise<void> {
  const vaga = await buscarVaga(id);
  if (!vaga) return;
  // O registro preserva uma vaga do JSON mesmo se ela ainda não existia no banco.
  await prisma.vaga.upsert({
    where: { id },
    create: { ...vaga, arquivada: true },
    update: { arquivada: true },
  });
}

export async function contarVagas(): Promise<{ total: number; iniciantes: number }> {
  const [publicadas, gravadas, totalDoBanco] = await Promise.all([
    buscarJson<Vaga[]>("vagas.json", 60, "vagas", vagasLocais as Vaga[]),
    prisma.vaga.findMany({ select: { id: true, arquivada: true, aceitaIniciante: true } }),
    prisma.vaga.count({ where: { arquivada: false } }),
  ]);
  const idsGravados = new Set(gravadas.map((vaga) => vaga.id));
  const apenasNoJson = publicadas.filter((vaga) => !idsGravados.has(vaga.id));
  return {
    total: totalDoBanco + apenasNoJson.length,
    iniciantes:
      gravadas.filter((vaga) => !vaga.arquivada && vaga.aceitaIniciante).length +
      apenasNoJson.filter((vaga) => vaga.aceitaIniciante).length,
  };
}

export function guardarCandidatura(candidatura: CandidaturaRecebida): void {
  candidaturasRecebidas.push(candidatura);
}

export async function guardarEmpresa(empresa: Empresa): Promise<void> {
  // upsert: cria na primeira edicao, atualiza nas seguintes. E a regra
  // "o banco vence" virando uma chamada so.
  await prisma.empresa.upsert({ where: { slug: empresa.slug }, create: empresa, update: empresa });
}
