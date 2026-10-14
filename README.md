# leque-de-vagas

## Frentes de Ryann

| Frente | Responsabilidade |
| --- | --- |
| 1 | Vagas, publicação e contrato de dados |
| 4 | Busca, filtros, números e arquivamento |

| Rota | O que mostra |
| --- | --- |
| `/vagas` | Mural de vagas com filtros e números |
| `/vagas/[id]` | Detalhes de uma vaga |
| `/vagas/nova` | Formulário para publicar uma vaga |
| `/api/vagas` | Vagas ativas em JSON |

## O estado do projeto

As vagas publicadas vêm de `dados/vagas.json` no GitHub e são reunidas às vagas gravadas no SQLite local. O banco vence quando o mesmo ID aparece nas duas fontes. Uma vaga nova acrescentada ao JSON pode levar até **60 segundos** para aparecer por causa da revalidação configurada no `fetch`.

O arquivamento preserva o registro no banco e o esconde do mural. Isso permite manter o histórico e impedir que uma vaga do JSON volte a aparecer após a próxima atualização.

O resultado de `npm run build` será registrado aqui quando a base Next.js e as dependências forem integradas pelas frentes responsáveis. O SQLite local não mantém gravações na Vercel; a publicação da aula 06 precisa de um banco hospedado.
