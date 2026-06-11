// Componenti piccoli della singola riga/card evento organizzatore.
// Condividono useOrganizerEvent, quindi le viste non passano piu l'evento a cascata.
import { Link } from "react-router-dom";
import {
  getImmagineEvento,
  getPostiDisponibili,
  getPostiPrenotati,
  getPostiTotali,
  getPrezzoEvento,
} from "../../../context/EventsContext.jsx";
import {
  useOrganizerEvent,
  useOrganizerEventsContext,
} from "../../../context/OrganizerEventsContext.jsx";

export function EventTitleCell({ heading = false }) {
  const evento = useOrganizerEvent();
  const TitleTag = heading ? "h5" : "span";

  return (
    <div className="d-flex align-items-center gap-3">
      <img
        src={getImmagineEvento(evento)}
        alt={evento.title}
        className="rounded-3 object-fit-cover flex-shrink-0"
        style={{ width: "58px", height: "58px" }}
      />
      <div>
        <TitleTag
          className={heading ? "card-title fw-bold mb-0" : "fw-semibold"}
        >
          {evento.title}
        </TitleTag>
        {!heading && <br />}
        <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal mt-1">
          {evento.category}
        </span>
      </div>
    </div>
  );
}

export function EventPriceBadge() {
  const evento = useOrganizerEvent();
  const className =
    Number(evento.price ?? 0) === 0
      ? "bg-primary bg-opacity-10 text-primary"
      : "bg-success bg-opacity-10 text-success";

  return (
    <span className={`badge px-2 py-1 rounded-pill ${className}`}>
      {getPrezzoEvento(evento)}
    </span>
  );
}

export function EventSeatsBadges() {
  const evento = useOrganizerEvent();

  return (
    <div className="d-flex flex-wrap gap-1">
      <span className="badge px-2 py-1 rounded-pill bg-primary bg-opacity-10 text-primary">
        {getPostiPrenotati(evento)} prenotati
      </span>
      <span
        className={`badge px-2 py-1 rounded-pill ${evento.available > 0 ? "bg-success bg-opacity-10 text-success" : "bg-danger bg-opacity-10 text-danger"}`}
      >
        {getPostiDisponibili(evento)} disponibili
      </span>
      <span className="badge px-2 py-1 rounded-pill bg-secondary bg-opacity-10 text-secondary">
        {getPostiTotali(evento)} totali
      </span>
    </div>
  );
}

export function EventActionButtons({ mobile = false }) {
  const evento = useOrganizerEvent();
  const { apriModaleModifica, apriModaleElimina } = useOrganizerEventsContext();

  if (mobile) {
    return (
      <div className="d-flex gap-2 border-top pt-3 mt-2">
        <button
          onClick={() => apriModaleModifica(evento)}
          className="btn btn-sm btn-outline-secondary flex-grow-1 rounded-pill"
        >
          <i className="bi bi-pencil me-2"></i> Modifica
        </button>
        <button
          onClick={() => apriModaleElimina(evento)}
          className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill"
        >
          <i className="bi bi-trash me-2"></i> Elimina
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-end gap-2 flex-nowrap">
      <Link
        to={`/eventi/${evento.id}`}
        className="btn btn-sm btn-light text-primary rounded-pill shadow-sm flex-shrink-0"
        title="Vedi evento"
      >
        <i className="bi bi-eye"></i>
      </Link>
      <button
        onClick={() => apriModaleModifica(evento)}
        className="btn btn-sm btn-light text-secondary rounded-pill shadow-sm flex-shrink-0"
        title="Modifica"
      >
        <i className="bi bi-pencil"></i>
      </button>
      <button
        onClick={() => apriModaleElimina(evento)}
        className="btn btn-sm btn-light text-danger rounded-pill shadow-sm flex-shrink-0"
        title="Elimina"
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}
