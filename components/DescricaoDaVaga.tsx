"use client";

import { useState } from "react";

const LIMITE = 180;

export default function DescricaoDaVaga({ texto }: { texto: string }) {
  const [aberta, setAberta] = useState(false);
  const precisaCortar = texto.length > LIMITE;
  const textoVisivel = aberta || !precisaCortar ? texto : `${texto.slice(0, LIMITE).trim()}…`;

  return (
    <div>
      <p className="descricao-vaga">{textoVisivel}</p>
      {precisaCortar && (
        <button className="botao-texto" type="button" onClick={() => setAberta((valor) => !valor)}>
          {aberta ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
}
