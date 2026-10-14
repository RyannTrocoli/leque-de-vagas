import Link from "next/link";
import { vagas } from "@/data/vagas";

export default function PaginaDeVagas() {
  return (
    <main className="container pagina-listagem">
      <h1>Vagas de tecnologia</h1>
      <ul>
        {vagas.map((vaga) => (
          <li key={vaga.id}>
            <Link href={`/vagas/${vaga.id}`}>{vaga.titulo}</Link>
            <p>{vaga.empresa} · {vaga.area} · {vaga.local}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
