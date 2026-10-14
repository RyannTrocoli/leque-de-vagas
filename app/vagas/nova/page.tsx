import FormularioNovaVaga from "@/components/FormularioNovaVaga";
import { listarEmpresas } from "@/lib/api";

export default async function NovaVaga() {
  const empresas = await listarEmpresas();
  return (
    <main className="container pagina-form">
      <h1>Publicar vaga</h1>
      <FormularioNovaVaga empresas={empresas} />
    </main>
  );
}
