// Context per la gestione eventi organizzatore nella dashboard.
// Usa EventsContext per lista eventi e helper, qui restano solo modali e azioni CRUD.
import { createContext, useContext, useState } from "react";
import eventsPlaceholder from "../assets/img/events_placeholder.webp";
import { eventsAPI } from "../services/api";
import { useAuth } from "./AuthContext";
import { getImmagineEvento, useEvents } from "./EventsContext";

export const datiEventoVuoti = {
  title: "",
  description: "",
  date: "",
  location: "",
  indirizzo: "",
  price: "",
  max_seats: "",
  category: "",
};

export const categorieEvento = [
  "Musica",
  "Sport",
  "Tecnologia",
  "Cultura e Spettacolo",
  "Enogastronomia",
];

export const cittaEvento = ["Roma", "Napoli", "Firenze", "Ancona", "Milano"];

const preparaDatiEvento = (form) => ({
  title: form.title,
  description: form.description,
  date: form.date,
  location: form.location,
  indirizzo: form.indirizzo,
  ...(form.price !== "" && { price: form.price }),
  max_seats: form.max_seats,
  category: form.category,
});

const creaFormDaEvento = (evento) => ({
  title: evento.title || "",
  description: evento.description || "",
  date: evento.date
    ? (() => {
        const d = new Date(evento.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
          d.getDate(),
        ).padStart(2, "0")}`;
      })()
    : "",
  location: evento.location || "",
  indirizzo: evento.indirizzo || "",
  price: evento.price ?? "",
  max_seats: evento.seats_available ?? "",
  category: evento.category || "",
});

const dataOggi = () => {
  const oggi = new Date();
  return `${oggi.getFullYear()}-${String(oggi.getMonth() + 1).padStart(2, "0")}-${String(
    oggi.getDate(),
  ).padStart(2, "0")}`;
};

const OrganizerEventsContext = createContext(null);
const OrganizerEventItemContext = createContext(null);

export function OrganizerEventsProvider({ children }) {
  const { utente } = useAuth();
  const {
    eventi: tuttiGliEventi,
    loading: caricamento,
    errore,
    caricaEventi,
    rimuoviEvento,
  } = useEvents();
  const [toast, setToast] = useState(null);

  const [mostraModaleCreazione, setMostraModaleCreazione] = useState(false);
  const [datiFormCreazione, setDatiFormCreazione] = useState(datiEventoVuoti);
  const [immagineNuovoEvento, setImmagineNuovoEvento] = useState(null);
  const [anteprimaNuovaImmagine, setAnteprimaNuovaImmagine] = useState(null);
  const [erroreModaleCreazione, setErroreModaleCreazione] = useState(null);
  const [caricamentoModaleCreazione, setCaricamentoModaleCreazione] =
    useState(false);

  const [eventoInModifica, setEventoInModifica] = useState(null);
  const [mostraModaleModifica, setMostraModaleModifica] = useState(false);
  const [datiFormModifica, setDatiFormModifica] = useState(datiEventoVuoti);
  const [immagineEvento, setImmagineEvento] = useState(null);
  const [anteprimaImmagine, setAnteprimaImmagine] = useState(null);
  const [erroreModaleModifica, setErroreModaleModifica] = useState(null);
  const [caricamentoModaleModifica, setCaricamentoModaleModifica] =
    useState(false);

  const [eventoDaEliminare, setEventoDaEliminare] = useState(null);
  const [erroreElimina, setErroreElimina] = useState(null);
  const [caricamentoElimina, setCaricamentoElimina] = useState(false);

  const eventi =
    utente?.role === "admin"
      ? tuttiGliEventi
      : tuttiGliEventi.filter(
          (evento) => Number(evento.organizer_id) === Number(utente?.id),
        );

  const mostraToast = (messaggio, tipo = "success") => {
    setToast({ messaggio, tipo });
    setTimeout(() => setToast(null), 3500);
  };

  const apriModaleCreazione = () => {
    setDatiFormCreazione(datiEventoVuoti);
    setImmagineNuovoEvento(null);
    setAnteprimaNuovaImmagine(eventsPlaceholder);
    setErroreModaleCreazione(null);
    setMostraModaleCreazione(true);
  };

  const chiudiModaleCreazione = () => {
    setMostraModaleCreazione(false);
    setDatiFormCreazione(datiEventoVuoti);
    setImmagineNuovoEvento(null);
    setAnteprimaNuovaImmagine(null);
    setErroreModaleCreazione(null);
  };

  const gestisciCambioInputCreazione = (e) => {
    const { name, value } = e.target;
    setDatiFormCreazione((prev) => ({ ...prev, [name]: value }));
  };

  const gestisciCambioImmagineCreazione = (e) => {
    const file = e.target.files[0] || null;
    setImmagineNuovoEvento(file);
    setAnteprimaNuovaImmagine(
      file ? URL.createObjectURL(file) : eventsPlaceholder,
    );
  };

  const gestisciSubmitCreazione = async (e) => {
    e.preventDefault();
    setErroreModaleCreazione(null);

    if (datiFormCreazione.date < dataOggi()) {
      mostraToast("La data è precedente a quella di oggi.", "danger");
      return;
    }

    setCaricamentoModaleCreazione(true);

    try {
      const nuovoEvento = await eventsAPI.crea(
        preparaDatiEvento(datiFormCreazione),
      );
      if (immagineNuovoEvento) {
        await eventsAPI.aggiornaImmagine(nuovoEvento.id, immagineNuovoEvento);
      }

      await caricaEventi();
      chiudiModaleCreazione();
      mostraToast("Evento creato con successo!");
    } catch (err) {
      setErroreModaleCreazione(
        err.message || "Errore durante la creazione dell'evento",
      );
    } finally {
      setCaricamentoModaleCreazione(false);
    }
  };

  const apriModaleModifica = (evento) => {
    setEventoInModifica(evento);
    setDatiFormModifica(creaFormDaEvento(evento));
    setImmagineEvento(null);
    setAnteprimaImmagine(getImmagineEvento(evento));
    setErroreModaleModifica(null);
    setMostraModaleModifica(true);
  };

  const chiudiModaleModifica = () => {
    setMostraModaleModifica(false);
    setEventoInModifica(null);
    setErroreModaleModifica(null);
    setImmagineEvento(null);
    setAnteprimaImmagine(null);
  };

  const gestisciCambioInputModifica = (e) => {
    const { name, value } = e.target;
    setDatiFormModifica((prev) => ({ ...prev, [name]: value }));
  };

  const gestisciCambioImmagineModifica = (e) => {
    const file = e.target.files[0] || null;
    setImmagineEvento(file);
    setAnteprimaImmagine(
      file ? URL.createObjectURL(file) : getImmagineEvento(eventoInModifica),
    );
  };

  const gestisciSubmitModifica = async (e) => {
    e.preventDefault();
    if (!eventoInModifica) return;

    setErroreModaleModifica(null);
    setCaricamentoModaleModifica(true);

    try {
      await eventsAPI.aggiorna(
        eventoInModifica.id,
        preparaDatiEvento(datiFormModifica),
      );
      if (immagineEvento) {
        await eventsAPI.aggiornaImmagine(eventoInModifica.id, immagineEvento);
      }

      await caricaEventi();
      chiudiModaleModifica();
      mostraToast("Evento aggiornato con successo!");
    } catch (err) {
      setErroreModaleModifica(
        err.message || "Errore durante l'aggiornamento dell'evento",
      );
    } finally {
      setCaricamentoModaleModifica(false);
    }
  };

  const apriModaleElimina = (evento) => {
    setEventoDaEliminare(evento);
    setErroreElimina(null);
  };

  const chiudiModaleElimina = () => {
    setEventoDaEliminare(null);
    setErroreElimina(null);
  };

  const gestisciElimina = async () => {
    if (!eventoDaEliminare) return;

    setErroreElimina(null);
    setCaricamentoElimina(true);

    try {
      await eventsAPI.elimina(eventoDaEliminare.id);
      rimuoviEvento(eventoDaEliminare.id);
      chiudiModaleElimina();
      mostraToast("Evento eliminato con successo!");
    } catch (err) {
      setErroreElimina(err.message || "Errore durante l'eliminazione");
    } finally {
      setCaricamentoElimina(false);
    }
  };

  const value = {
    caricamento,
    errore,
    utente,
    eventi,
    toast,
    nascondiToast: () => setToast(null),
    apriModaleCreazione,
    apriModaleModifica,
    apriModaleElimina,
    eventoDaEliminare,
    erroreElimina,
    caricamentoElimina,
    chiudiModaleElimina,
    gestisciElimina,
    creazione: {
      visibile: mostraModaleCreazione,
      titolo: "Crea Evento",
      form: datiFormCreazione,
      errore: erroreModaleCreazione,
      caricamento: caricamentoModaleCreazione,
      anteprimaImmagine: anteprimaNuovaImmagine,
      nomeImmagine: immagineNuovoEvento?.name,
      fileInputId: "create-event-image",
      minPosti: "1",
      testoBottone: "Crea Evento",
      testoCaricamento: "Salvataggio...",
      onChange: gestisciCambioInputCreazione,
      onImageChange: gestisciCambioImmagineCreazione,
      onSubmit: gestisciSubmitCreazione,
      onClose: chiudiModaleCreazione,
    },
    modifica: {
      visibile: mostraModaleModifica,
      titolo: "Modifica Evento",
      form: datiFormModifica,
      errore: erroreModaleModifica,
      caricamento: caricamentoModaleModifica,
      anteprimaImmagine,
      nomeImmagine: immagineEvento?.name,
      fileInputId: "edit-event-image",
      minPosti: "0",
      testoBottone: "Salva Modifiche",
      testoCaricamento: "Salvataggio...",
      onChange: gestisciCambioInputModifica,
      onImageChange: gestisciCambioImmagineModifica,
      onSubmit: gestisciSubmitModifica,
      onClose: chiudiModaleModifica,
    },
  };

  return (
    <OrganizerEventsContext.Provider value={value}>
      {children}
    </OrganizerEventsContext.Provider>
  );
}

export function useOrganizerEventsContext() {
  const context = useContext(OrganizerEventsContext);

  if (!context) {
    throw new Error(
      "useOrganizerEventsContext deve essere usato dentro OrganizerEventsProvider",
    );
  }

  return context;
}

export function OrganizerEventProvider({ evento, children }) {
  return (
    <OrganizerEventItemContext.Provider value={evento}>
      {children}
    </OrganizerEventItemContext.Provider>
  );
}

export function useOrganizerEvent() {
  const evento = useContext(OrganizerEventItemContext);

  if (!evento) {
    throw new Error(
      "useOrganizerEvent deve essere usato dentro OrganizerEventProvider",
    );
  }

  return evento;
}
