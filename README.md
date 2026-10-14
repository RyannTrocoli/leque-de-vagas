# leque-de-vagas

## Como rodar

Requisito: Node.js 20.9 ou mais recente.

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Abra `http://localhost:3000`. O `npm install` já gera o cliente do Prisma (`postinstall`), e o `db:setup` aplica as migrations no SQLite local (`dev.db`, fora do Git).

## Equipe e frentes

A equipe tem três pessoas. Combinado com a professora, a frente 4 é rotativa e, neste ciclo, está com o Ryann.

| Frente | Responsável | Branch |
| --- | --- | --- |
| Base do projeto + 2 · Empresa | Adryano | `adryano-frente-2` |
| 1 · Vaga | Ryann | `ryann-frente-1` |
| 3 · Pessoa e candidatura | Gabriel | `gabriel-frente-3` |
| 4 · Busca e números (rotativa) | Ryann | `rotativa-frente4` |

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
| `/` | Apresentação do produto |
| `/empresas` | Lista de empresas e quantas vagas cada uma tem |
| `/empresas/[slug]` | Perfil da empresa com as abas Sobre e Vagas |
| `/empresas/[slug]/editar` | Edição do perfil da empresa |
| `/api/empresas/[slug]` | Uma empresa em JSON (404 se não existir) |
| `/termos` | Termos de uso no route group `(institucional)` |
| `/privacidade` | Informações de privacidade no route group `(institucional)` |

## O estado do projeto

As vagas publicadas vêm de `dados/vagas.json` no GitHub e são reunidas às vagas gravadas no SQLite local. O banco vence quando o mesmo ID aparece nas duas fontes. Uma vaga nova acrescentada ao JSON pode levar até **60 segundos** para aparecer por causa da revalidação configurada no `fetch`.

O arquivamento preserva o registro no banco e o esconde do mural. Isso permite manter o histórico e impedir que uma vaga do JSON volte a aparecer após a próxima atualização.

O resultado de `npm run build` será registrado aqui quando a base Next.js e as dependências forem integradas pelas frentes responsáveis. O SQLite local não mantém gravações na Vercel; a publicação da aula 06 precisa de um banco hospedado.

## Base do projeto

- Next.js 16 com App Router, TypeScript, ESLint e alias `@/*`. **Sem Tailwind**: ele entra na aula 08, então até lá o estilo é CSS comum em `app/globals.css`.
- `cacheComponents` fica desligado no `next.config.ts`. O projeto segue o modelo das aulas 04 a 06: `fetch` com `revalidate`, `generateStaticParams` e rotas estáticas (○/●) e dinâmicas (ƒ).
- Prisma fixado na versão 6, porque o `schema.prisma` usa `url = env("DATABASE_URL")`, formato que a versão 7 não aceita mais.

### Link ativo no menu

O `MenuLink` acende a **seção inteira**: "Vagas" continua marcado em `/vagas/1` e `/vagas/nova`, porque a pessoa ainda está navegando pelas vagas. A home é tratada à parte, com comparação exata: como todo caminho começa com `/`, ela ficaria acesa em todas as páginas.

## Frente 2 · Empresa

| Componente de cliente | Por que precisa do navegador |
| --- | --- |
| `MenuLink` | lê a rota atual com `usePathname` para marcar o link ativo |
| `AbasDaEmpresa` | tem `onClick` e guarda qual aba a pessoa escolheu |
| `FormularioEmpresa` | usa `useActionState` para mostrar os erros e o sucesso devolvidos pela Server Action |

As páginas `/empresas`, `/empresas/[slug]` e `/editar` continuam no servidor: elas buscam os dados e entregam por prop.

**O que decidimos não guardar em estado:** a aba guarda um texto só (`"sobre"` ou `"vagas"`), e não dois booleanos que poderiam ficar os dois verdadeiros. A contagem "Vagas (n)" sai de `vagas.length`, que a página manda por prop; número que dá para contar não vira estado.

**Dados das empresas:** vêm de `dados/empresas.json` com `revalidate` de **1 hora**, porque perfil de empresa muda bem menos que vaga. Se a rede falhar, o projeto usa a cópia local do mesmo arquivo.

**Edição do perfil:**

- Sucesso aparece na própria tela, sem `redirect`, porque a pessoa pode continuar editando. Criar vaga redireciona porque ali a tarefa terminou.
- A ação revalida `/empresas` **e** `/empresas/[slug]`: são rotas com cache próprio, e avisar só uma deixaria a outra com o nome antigo.
- O `slug` não é editável, porque é ele que liga a empresa às vagas (`empresaSlug`).
- A partir da aula 06 a edição grava no banco. Quando o mesmo slug existe no JSON e no banco, **o banco vence**. A justificativa está no [`DADOS.md`](DADOS.md).

## Frente 3 · Pessoa e candidatura

| Componente de cliente | Por que precisa do navegador |
| --- | --- |
| `FormularioDeCandidatura` | usa `useActionState` para receber erros e sucesso da Server Action e o botão de correção precisa de interação no navegador |
| `BotaoDeEnviar` | usa `useFormStatus` para desabilitar o envio e trocar o texto enquanto o formulário está pendente |
| `app/vagas/[id]/error.tsx` | o botão de nova tentativa chama `reset()` para renderizar novamente o trecho que falhou |

`notFound()` é usado quando a vaga procurada não existe. Repetir a mesma busca não resolveria. Já `error.tsx` trata uma falha inesperada, como um problema temporário de rede, então faz sentido oferecer uma nova tentativa.

As habilidades usam checkboxes com o mesmo `name="habilidades"`. A Server Action recebe a lista com `FormData.getAll("habilidades")`. Escolhemos isso em vez de manter chips em `useState` porque o formulário continua enviando sem JavaScript e não precisa de um campo escondido sincronizado pelo navegador.

Com o JavaScript desligado, o envio do formulário, a validação no servidor e o registro da candidatura continuam funcionando. O texto `Enviando…` não aparece durante a espera, e o botão `Corrigir alguma coisa` da tela de sucesso precisa do JavaScript para voltar ao formulário sem outra navegação.

