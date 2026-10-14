import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import { vagas } from "@/data/vagas";

type Props = { params: Promise<{ id: string }> };

export default async function PaginaDaVaga({ params }: Props) {
  const { id } = await params;
  const vaga = vagas.find((item) => item.id === id);
  if (!vaga) notFound();

  return (
    <main className="container pagina-detalhe">
      <Link href="/vagas">← Voltar para as vagas</Link>
      <article>
        <h1>{vaga.titulo}</h1>
        <p><Link href={`/empresas/${vaga.empresaSlug}`}>{vaga.empresa}</Link></p>
        <dl>
          <dt>Área</dt><dd>{vaga.area}</dd>
          <dt>Senioridade</dt><dd>{vaga.senioridade}</dd>
          <dt>Local</dt><dd>{vaga.local}</dd>
        </dl>
        <h2>Descrição</h2>
        <DescricaoDaVaga texto={vaga.descricao} />
        <BotaoCopiarLink />
      </article>
    </main>
  );
}
