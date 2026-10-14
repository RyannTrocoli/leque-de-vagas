import Link from "next/link";

export default function PaginaNaoEncontrada() {
  return (
    <main className="container">
      <div className="estado-vazio">
        <h1>Página não encontrada</h1>
        <p>O endereço acessado não existe no Leque de Vagas.</p>
        <p>
          <Link className="botao" href="/">Voltar para o início</Link>
        </p>
      </div>
    </main>
  );
}
