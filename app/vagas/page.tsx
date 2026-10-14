import CardDeVaga from "@/components/CardDeVaga";
import { vagas } from "@/data/vagas";

export default function PaginaDeVagas() {
  return (
    <main className="container pagina-listagem">
      <h1>Vagas de tecnologia</h1>
      <div className="grade-vagas">
        {vagas.map((vaga) => <CardDeVaga key={vaga.id} vaga={vaga} />)}
      </div>
    </main>
  );
}
