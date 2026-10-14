"use client";

export default function ErroDaVaga({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="container pagina-detalhe">
      <div className="estado-vazio">
        <h1>Não foi possível carregar esta vaga</h1>
        <p>Ocorreu um problema ao buscar os dados. Tente novamente em alguns instantes.</p>
        <div>
          <button className="botao" type="button" onClick={() => reset()}>
            Tentar novamente
          </button>
        </div>
      </div>
    </main>
  );
}
