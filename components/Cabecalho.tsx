import Link from "next/link";
import MenuLink from "@/components/MenuLink";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <Link className="marca" href="/">Leque de Vagas</Link>
        <nav aria-label="Navegacao principal">
          <ul className="menu">
            <li><MenuLink href="/">Inicio</MenuLink></li>
            <li><MenuLink href="/vagas">Vagas</MenuLink></li>
            <li><MenuLink href="/empresas">Empresas</MenuLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
