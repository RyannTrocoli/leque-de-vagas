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

export type Estado = {
  ok: boolean;
  erros: Record<string, string>;
  valores: Record<string, string>;
  mensagem?: string;
};

export const ESTADO_INICIAL: Estado = { ok: false, erros: {}, valores: {} };
