import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FormularioEmpresa from "@/components/FormularioEmpresa";
import { buscarEmpresa } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: "Editar empresa" };

export default async function EditarEmpresa({ params }: Props) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) notFound();

  return (
    <main className="container pagina-form">
      <Link className="link-voltar" href={`/empresas/${slug}`}>← Voltar para {empresa.nome}</Link>
      <header className="topo-pagina">
        <span className="sobretitulo">Perfil da empresa</span>
        <h1>Editar {empresa.nome}</h1>
        <p>O endereco da empresa (slug) nao pode ser alterado porque liga a empresa as vagas publicadas.</p>
      </header>
      <FormularioEmpresa empresa={empresa} />
    </main>
  );
}
