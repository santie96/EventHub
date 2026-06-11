// Renderizza i tre input della hero usando direttamente SearchContext.
// Solo il campo eventi mostra il dropdown dei suggerimenti.
import { useSearchContext } from "../../../context/SearchContext";
import HeroSuggestion from "./HeroSuggestion";

function HeroSearchField() {
  const search = useSearchContext();
  const mostraSuggerimenti =
    search.inputAttivo === "ricerca" && search.eventiSuggeriti.length > 0;

  return (
    <>
      <div className="form-floating flex-fill position-relative">
        <input
          className="form-control custom-rounded-start rounded-start-3"
          type="search"
          id="search"
          placeholder=" "
          value={search.ricerca}
          onFocus={() => search.attivaInput("ricerca")}
          onBlur={() => search.attivaInput(null)}
          onChange={(e) => search.cambiaRicerca(e.target.value)}
          autoComplete="off"
        />

        <label htmlFor="search">
          <i className="bi bi-search"></i> Cerca eventi, artisti, luoghi...
        </label>

        {mostraSuggerimenti && (
          <div
            className="hero-search-results position-absolute top-100 start-0 end-0 bg-white text-start shadow rounded-3 mt-2 overflow-hidden"
            onMouseDown={(e) => e.preventDefault()}
          >
            <HeroSuggestion />
          </div>
        )}
      </div>

      <div className="form-floating flex-fill position-relative">
        <input
          className="form-control custom-rounded-inner"
          type="search"
          id="geo"
          placeholder=" "
          value={search.ricercaLocation}
          onFocus={() => search.attivaInput(null)}
          onBlur={() => search.attivaInput(null)}
          onChange={(e) => search.cambiaLocation(e.target.value)}
          autoComplete="off"
        />

        <label htmlFor="geo">
          <i className="bi bi-geo-alt"></i> Dove?
        </label>
      </div>

      <div className="form-floating flex-fill position-relative">
        <input
          className="form-control custom-rounded-inner"
          type="search"
          id="date"
          placeholder=" "
          value={search.ricercaData}
          onFocus={() => search.attivaInput(null)}
          onBlur={() => search.attivaInput(null)}
          onChange={(e) => search.cambiaData(e.target.value)}
          autoComplete="off"
        />

        <label htmlFor="date">
          <i className="bi bi-calendar-week"></i> Quando?
        </label>
      </div>
    </>
  );
}

export default HeroSearchField;
