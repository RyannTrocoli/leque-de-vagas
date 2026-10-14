import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <span className="sobretitulo">Oportunidades sem pegadinha</span>
        <h1>A primeira vaga em tech pode estar mais perto.</h1>
        <p className="hero-texto">
          Encontre oportunidades de entrada filtradas por area, senioridade e modelo de trabalho — sem perder tempo
          com vagas junior que pedem experiencia de senior.
        </p>
        <div className="hero-acoes">
          <Link className="botao" href="/vagas">Explorar vagas</Link>
          <Link className="botao botao-secundario" href="/empresas">Conhecer empresas</Link>
        </div>
      </section>
    </main>
  );
}
