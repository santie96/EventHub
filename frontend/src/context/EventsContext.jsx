import { createContext, useContext, useState, useEffect } from "react";
import eventsPlaceholder from "../assets/img/events_placeholder.webp";
import { eventsAPI } from "../services/api";

const EventsContext = createContext(null);

export const getPostiPrenotati = (evento) =>
  Number(evento.seats_prenotati ?? 0);
export const getPostiDisponibili = (evento) => Number(evento.seats_available ?? 0);
export const getPostiTotali = (evento) =>
  getPostiPrenotati(evento) + getPostiDisponibili(evento);
export const getPrezzoEvento = (evento) =>
  Number(evento.price ?? 0) === 0
    ? "Gratis"
    : `${Number(evento.price).toFixed(2)} euro`;
export const getImmagineEvento = (evento) => evento.image || eventsPlaceholder;

// Provider
export function EventsProvider({ children }) {
  const [eventi, setEventi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  const caricaEventi = async () => {
    setLoading(true);
    setErrore(null);

    try {
      const datiEventi = await eventsAPI.getAll();
      setEventi(datiEventi);
    } catch (err) {
      setErrore(err.message);
    } finally {
      setLoading(false);
    }
  };

  const rimuoviEvento = (id) => {
    setEventi((eventiAttuali) =>
      eventiAttuali.filter((evento) => evento.id !== id),
    );
  };

  useEffect(() => {
    let annullato = false;

    const recuperaEventi = async () => {
      try {
        const datiEventi = await eventsAPI.getAll();

        if (!annullato) {
          setEventi(datiEventi);
        }
      } catch (err) {
        if (!annullato) {
          setErrore(err.message);
        }
      } finally {
        if (!annullato) {
          setLoading(false);
        }
      }
    };

    recuperaEventi();

    return () => {
      annullato = true;
    };
  }, []);

  return (
    <EventsContext.Provider
      value={{ eventi, loading, errore, caricaEventi, rimuoviEvento }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
