// Renderizza i suggerimenti evento usando SearchContext.
// Al click inserisce il titolo dell'evento nel primo input.
import { useSearchContext } from "../../../context/SearchContext";

function HeroSuggestion() {
  const { eventiSuggeriti, selezionaEvento } = useSearchContext();

  return eventiSuggeriti.map((evento) => (
    <button
      key={evento.id}
      type="button"
      className="hero-search-result text-dark text-start border-0 bg-transparent px-3 py-2 w-100 border-bottom"
      onClick={() => selezionaEvento(evento.title)}
    >
      <span className="d-flex align-items-center gap-2 fw-semibold">
        {evento.title}
      </span>

      <small className="d-block mt-1">
        {evento.organizer_fullname} - {evento.location} -{" "}
        {new Date(evento.date).toLocaleDateString("it-IT")}
      </small>
    </button>
  ));
}

export default HeroSuggestion;
