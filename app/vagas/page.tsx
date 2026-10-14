import type { Metadata } from "next";
import { Suspense } from "react";
import EsqueletoLista from "@/components/EsqueletoLista";
import EsqueletoNumeros from "@/components/EsqueletoNumeros";
import ListagemDeVagas from "@/components/ListagemDeVagas";
import NumerosDoCatalogo from "@/components/NumerosDoCatalogo";

export const metadata: Metadata = { title: "Vagas", description: "Busque e filtre vagas de entrada em tecnologia." };

export default function PaginaDeVagas() {
  return (
    <div className="container pagina-listagem">
      <header className="topo-pagina topo-com-numeros">
        <div><span className="sobretitulo">Oportunidades abertas</span><h1>Vagas que fazem sentido para o seu momento.</h1></div>
        <Suspense fallback={<EsqueletoNumeros />}><NumerosDoCatalogo /></Suspense>
      </header>
      <Suspense fallback={<EsqueletoLista />}><ListagemDeVagas /></Suspense>
    </div>
  );
}
