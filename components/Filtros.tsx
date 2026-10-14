type Props = {
  busca: string;
  aoMudarBusca: (valor: string) => void;
  area: string;
  aoMudarArea: (valor: string) => void;
  areas: string[];
};

export default function Filtros({ busca, aoMudarBusca, area, aoMudarArea, areas }: Props) {
  return (
    <section className="filtros" aria-label="Filtros de vagas">
      <label className="campo campo-busca">
        <span>Buscar por titulo, empresa ou local</span>
        <input
          type="search"
          value={busca}
          onChange={(evento) => aoMudarBusca(evento.target.value)}
          placeholder="Ex.: front-end, dados, remoto"
        />
      </label>
      <div className="grupo-filtro">
        <span>Area</span>
        <div className="chips">
          {areas.map((opcao) => (
            <button
              type="button"
              key={opcao}
              className={area === opcao ? "chip ativo" : "chip"}
              onClick={() => aoMudarArea(opcao)}
              aria-pressed={area === opcao}
            >
              {opcao}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
