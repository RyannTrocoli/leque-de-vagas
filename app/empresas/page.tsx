import type { Metadata } from "next";
import Link from "next/link";
import { listarEmpresas, listarVagas } from "@/lib/api";

export const metadata: Metadata = {
  title: "Empresas",
  description: "Conheca as empresas que publicam vagas de entrada no Leque de Vagas.",
};

export default async function PaginaDeEmpresas() {
  const [empresas, vagas] = await Promise.all([listarEmpresas(), listarVagas()]);

  return (
    <main className="container pagina-listagem">
      <header className="topo-pagina">
        <span className="sobretitulo">Quem esta contratando</span>
        <h1>Empresas abertas a novos caminhos.</h1>
        <p>Conheca a cultura e veja as oportunidades de cada time.</p>
      </header>
      <div className="grade-empresas">
        {empresas.map((empresa) => {
          const total = vagas.filter((vaga) => vaga.empresaSlug === empresa.slug).length;
          return (
            <article className="card-empresa" key={empresa.slug}>
              <h2><Link href={`/empresas/${empresa.slug}`}>{empresa.nome}</Link></h2>
              <p>{empresa.sobre.split("\n")[0]}</p>
              <Link className="link-seta" href={`/empresas/${empresa.slug}`}>
                {total} vaga(s) aberta(s) <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
