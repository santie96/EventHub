import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "./EventsContext";

const SearchContext = createContext(null);

function normalizzaTesto(testo) {
  return testo.toLowerCase().trim();
}

function eventoCorrisponde(evento, ricerca) {
  if (!ricerca) return true;
  return evento.title?.toLowerCase().includes(ricerca);
}

export function SearchProvider({ children }) {
  const { eventi } = useEvents();
  const navigate = useNavigate();

  const [ricerca, setRicerca] = useState("");
  const [ricercaLocation, setRicercaLocation] = useState("");
  const [ricercaData, setRicercaData] = useState("");
  const [inputAttivo, setInputAttivo] = useState(null);
  const [eventoSelezionato, setEventoSelezionato] = useState(false);

  const testoRicerca = normalizzaTesto(ricerca);
  const eventiSuggeriti =
    ricerca.trim() && !eventoSelezionato
      ? eventi
          .filter((evento) => eventoCorrisponde(evento, testoRicerca))
          .slice(0, 5)
      : [];

  const creaUrlEventi = () => {
    const params = new URLSearchParams();

    if (ricerca.trim()) params.set("q", ricerca.trim());
    if (ricercaLocation.trim()) params.set("location", ricercaLocation.trim());
    if (ricercaData.trim()) params.set("date", ricercaData.trim());

    const query = params.toString();
    return query ? `/eventi?${query}` : "/eventi";
  };

  const cercaEventi = (e) => {
    e.preventDefault();
    navigate(creaUrlEventi());
  };

  const cambiaRicerca = (valore) => {
    setRicerca(valore);
    setEventoSelezionato(false);
  };

  const selezionaEvento = (titolo) => {
    setRicerca(titolo);
    setEventoSelezionato(true);
    setInputAttivo(null);
  };

  return (
    <SearchContext.Provider
      value={{
        ricerca,
        ricercaLocation,
        ricercaData,
        inputAttivo,
        eventiSuggeriti,
        cercaEventi,
        cambiaRicerca,
        cambiaLocation: setRicercaLocation,
        cambiaData: setRicercaData,
        attivaInput: setInputAttivo,
        selezionaEvento,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  return useContext(SearchContext);
}
