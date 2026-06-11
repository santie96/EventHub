// Form di ricerca della hero con eventi, location e date.
// Usa SearchContext solo per il submit, i campi leggono il context da soli.
import { useSearchContext } from "../../../context/SearchContext";
import HeroSearchField from "./HeroSearchField";

function HeroSearchForm() {
  const { cercaEventi } = useSearchContext();

  return (
    <form
      className="d-flex flex-column gap-2 flex-sm-row gap-sm-0 rounded-3 shadow"
      onSubmit={cercaEventi}
    >
      <HeroSearchField />

      <button
        className="btn btn-secondary hero-search-submit px-4 custom-rounded-end rounded-end-3"
        type="submit"
      >
        Cerca
      </button>
    </form>
  );
}

export default HeroSearchForm;
