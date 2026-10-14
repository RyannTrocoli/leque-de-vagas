import type { Metadata } from "next";

export const metadata: Metadata = { title: "Termos de uso" };

export default function Termos() {
  return (
    <main className="texto-longo">
      <header className="topo-pagina">
        <span className="sobretitulo">Institucional</span>
        <h1>Termos de uso</h1>
        <p>Condições básicas para utilizar o Leque de Vagas.</p>
      </header>
      <p>
        O Leque de Vagas é um projeto educacional para divulgar oportunidades de tecnologia. As vagas podem ser atualizadas,
        arquivadas ou removidas, e as informações enviadas nos formulários devem ser verdadeiras.
      </p>
    </main>
  );
}
