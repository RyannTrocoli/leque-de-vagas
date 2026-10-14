# Contrato de dados

O contrato que as telas usam continua escrito a mao em `lib/tipos.ts`. O `prisma/schema.prisma` descreve a persistencia e pode ter campos que so o banco preenche (`criadaEm`, `arquivada`, `editadaEm`). Esses campos ficam fora dos tipos: o `lib/api.ts` converte o registro do banco para o contrato antes de entregar as telas.

## Vaga (frente 1 · Ryann)

_A preencher pelo Ryann._

## Empresa (frente 2 · Adryano)

- **Duas fontes:** `dados/empresas.json` e a lista publicada pela equipe; a tabela `Empresa` guarda as edicoes feitas pelo site em `/empresas/[slug]/editar`.
- **Regra quando o mesmo slug existe nas duas: o banco vence.** O registro do banco representa uma edicao feita por alguem pelo site, entao e a informacao mais recente. O JSON continua sendo a lista inicial e a fonte das empresas que nunca foram editadas.
- **Por isso a gravacao e um `upsert`:** cria o registro na primeira edicao e atualiza nas seguintes. Se a regra fosse "o JSON vence", esse mesmo codigo estaria errado mesmo compilando.
- **O `slug` e a chave (`@id`)** porque ja era o identificador do projeto: e o que a Vaga guarda em `empresaSlug` e o que aparece na URL. Pelo mesmo motivo ele nao e editavel no formulario.
- **Nao sincronizamos as duas fontes.** Uma empresa editada pelo site pode ficar diferente do JSON, e isso e esperado: a regra acima decide qual aparece.
- `editadaEm` e preenchido pelo banco (`@updatedAt`) e nao faz parte do tipo `Empresa`.

## Candidatura (frente 3 · Gabriel)

- Cada candidatura pertence a uma `Vaga` por `vagaId`, com a relação definida no Prisma.
- Algumas vagas vêm de `dados/vagas.json` e ainda não existem no SQLite. Antes de gravar a candidatura, copiamos a vaga para a tabela `Vaga` com `upsert`, garantindo que a chave estrangeira exista.
- Como o SQLite não tem uma lista de strings como campo simples, `habilidades` é armazenado como texto usando `JSON.stringify(habilidades)`.
- Nome e e-mail ficam gravados na candidatura. Se alguém pedir para apagar a própria candidatura, o e-mail armazenado pode ser usado para localizar e confirmar qual registro deve ser removido.
