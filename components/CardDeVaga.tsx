import Link from "next/link";
import type { Vaga } from "@/data/vagas";

export default function CardDeVaga({ vaga, acao }: { vaga: Vaga; acao?: React.ReactNode }) {
  return (
    <article className="card-vaga">
      <div className="card-vaga-topo">
        <span className="empresa-mini">{vaga.empresa}</span>
        {vaga.aceitaIniciante && <span className="selo selo-iniciante">Aceita iniciante</span>}
      </div>
      <div>
        <h3><Link href={`/vagas/${vaga.id}`}>{vaga.titulo}</Link></h3>
        <p className="metadados">{vaga.area} · {vaga.senioridade} · {vaga.local}</p>
      </div>
      <div className="card-vaga-rodape">
        <Link className="link-seta" href={`/vagas/${vaga.id}`}>Ver oportunidade <span aria-hidden="true">→</span></Link>
        {acao}
      </div>
    </article>
  );
}
