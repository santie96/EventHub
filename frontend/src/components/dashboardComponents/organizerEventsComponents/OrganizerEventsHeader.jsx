// Header della gestione eventi con titolo, filtro e bottone crea.
// Mostra titolo sezione e pulsante per aprire la modale di creazione.
import { useOrganizerEventsContext } from "../../../context/OrganizerEventsContext.jsx";

function OrganizerEventsHeader() {
  const { apriModaleCreazione, utente } = useOrganizerEventsContext();
  return (
    <div className="row align-items-start mb-4 g-3">
      <div className="col-md-8">
        <h2 className="fw-bold text-white mb-1">
          Gestione <span className="text-secondary">Eventi</span>
        </h2>
        <p className="mb-0 text-white">Visualizza e modifica gli eventi che hai creato</p>
      </div>

      {utente?.role !== "admin" && (
        <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
          <button
            type="button"
            className="btn btn-secondary rounded-pill px-4"
            onClick={apriModaleCreazione}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Crea evento
          </button>
        </div>
      )}
    </div>
  );
}

export default OrganizerEventsHeader;
