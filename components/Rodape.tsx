import Link from "next/link";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape-conteudo">
        <p>Leque de Vagas · vagas de entrada em tecnologia.</p>
        <nav aria-label="Links institucionais">
          <Link href="/termos">Termos</Link>
          <Link href="/privacidade">Privacidade</Link>
        </nav>
      </div>
    </footer>
  );
}
