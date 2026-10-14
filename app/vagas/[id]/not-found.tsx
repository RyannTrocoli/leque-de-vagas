import Link from "next/link";

export default function VagaNaoEncontrada() {
  return (
    <main className="container pagina-detalhe">
      <div className="estado-vazio">
        <h1>Vaga não encontrada</h1>
        <p>Essa vaga não existe ou não está mais disponível.</p>
        <p>
          <Link className="botao" href="/vagas">Ver outras vagas</Link>
        </p>
      </div>
    </main>
  );
}
