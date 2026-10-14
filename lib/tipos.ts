export type Vaga = {
  id: string;
  titulo: string;
  empresa: string;
  empresaSlug: string;
  area: string;
  senioridade: string;
  local: string;
  aceitaIniciante: boolean;
  descricao: string;
  publicadaEm?: string;
};

// Frente 2: o slug e a chave que as vagas guardam em empresaSlug e que vai na URL.
export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};

export type Estado = {
  ok: boolean;
  erros: Record<string, string>;
  valores: Record<string, string>;
  mensagem?: string;
};

export const ESTADO_INICIAL: Estado = { ok: false, erros: {}, valores: {} };
