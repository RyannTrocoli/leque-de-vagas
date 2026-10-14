import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacidade" };

export default function Privacidade() {
  return (
    <main className="texto-longo">
      <header className="topo-pagina">
        <span className="sobretitulo">Institucional</span>
        <h1>Privacidade</h1>
        <p>Como os dados enviados em uma candidatura são utilizados neste projeto.</p>
      </header>
      <p>
        Ao se candidatar, a pessoa informa nome, e-mail, vaga e habilidades. Esses dados são usados para registrar a candidatura
        relacionada à oportunidade escolhida.
      </p>
    </main>
  );
}
