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

// Frente 2: o slug nao e editavel, mas vem do formulario e por isso tambem e validado.
export const EsquemaDaEmpresa = z.object({
  slug: z.string().trim().min(1, "Empresa invalida."),
  nome: z.string().trim().min(3, "Informe um nome com pelo menos 3 caracteres."),
  sobre: z.string().trim().min(80, "Conte um pouco mais: use pelo menos 80 caracteres.").max(1200, "O texto pode ter no maximo 1.200 caracteres."),
  site: z.url("Informe uma URL completa, como https://empresa.com.br."),
});

export const EsquemaDoArquivo = z.object({ id: z.string().trim().min(1) });

export const EsquemaDaCandidatura = z.object({
  vagaId: z.string().trim().min(1, "Vaga inválida."),
  nome: z.string().trim().min(3, "Informe um nome com pelo menos 3 caracteres."),
  email: z.email("Informe um e-mail válido."),
  habilidades: z.array(z.string().trim().min(1)).min(1, "Escolha pelo menos uma habilidade."),
});
