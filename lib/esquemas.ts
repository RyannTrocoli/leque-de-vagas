import { z } from "zod";

export const EsquemaDaVaga = z.object({
  titulo: z.string().trim().min(8, "Informe um titulo com pelo menos 8 caracteres."),
  empresaSlug: z.string().trim().min(1, "Escolha uma empresa."),
  area: z.string().trim().min(1, "Escolha uma area."),
  senioridade: z.string().trim().min(1, "Escolha a senioridade."),
  local: z.string().trim().min(3, "Informe o modelo de trabalho ou a cidade."),
  aceitaIniciante: z.boolean(),
  descricao: z.string().trim().min(120, "A descricao precisa ter pelo menos 120 caracteres.").max(2000, "A descricao pode ter no maximo 2.000 caracteres."),
});
