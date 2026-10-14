import CardDeVaga from "@/components/CardDeVaga";
import { listarVagas } from "@/lib/api";

export default async function PaginaDeVagas() {
  const vagas = await listarVagas();
  return (
    <main className="container pagina-listagem">
      <h1>Vagas de tecnologia</h1>
      <div className="grade-vagas">
        {vagas.map((vaga) => <CardDeVaga key={vaga.id} vaga={vaga} />)}
      </div>
    </main>
  );
}
