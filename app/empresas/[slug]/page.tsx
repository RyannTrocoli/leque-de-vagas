import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";
import { buscarEmpresa, listarEmpresas, listarVagas } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

// Uma pagina pre-gerada no build para cada empresa conhecida.
export async function generateStaticParams() {
  const empresas = await listarEmpresas();
  return empresas.map((empresa) => ({ slug: empresa.slug }));
}

// O titulo da aba vira o nome da empresa: "Aurora Tech · Leque de Vagas".
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) return { title: "Empresa nao encontrada" };
  return { title: empresa.nome, description: empresa.sobre.slice(0, 155) };
}

export default async function PaginaDaEmpresa({ params }: Props) {
  const { slug } = await params;
  const [empresa, todasAsVagas] = await Promise.all([buscarEmpresa(slug), listarVagas()]);
  if (!empresa) notFound();

  // O filtro acontece no servidor; as abas so recebem o resultado pronto.
  const vagas = todasAsVagas.filter((vaga) => vaga.empresaSlug === slug);
  const iniciais = empresa.nome.split(" ").map((parte) => parte[0]).join("").slice(0, 2);

  return (
    <main className="container pagina-detalhe">
      <Link className="link-voltar" href="/empresas">← Voltar para as empresas</Link>
      <header className="cabecalho-empresa">
        <span className="marca-simbolo grande" aria-hidden="true">{iniciais}</span>
        <div>
          <span className="sobretitulo">Empresa</span>
          <h1>{empresa.nome}</h1>
          <div className="links-empresa">
            <a href={empresa.site} target="_blank" rel="noreferrer">Visitar site ↗</a>
          </div>
        </div>
      </header>
      <AbasDaEmpresa sobre={empresa.sobre} vagas={vagas} />
    </main>
  );
}
