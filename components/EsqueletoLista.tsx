export default function EsqueletoLista() {
  return (
    <div className="grade-vagas" aria-label="Carregando vagas">
      {[1, 2, 3].map((item) => <div className="esqueleto esqueleto-card" key={item} />)}
    </div>
  );
}
