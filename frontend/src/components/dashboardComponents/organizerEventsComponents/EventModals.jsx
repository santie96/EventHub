// Raccoglie tutte le modali della gestione eventi organizzatore.
// Include conferma eliminazione e form riutilizzato per creazione/modifica.
import eventsPlaceholder from "../../../assets/img/events_placeholder.webp";
import {
  categorieEvento,
  cittaEvento,
  useOrganizerEventsContext,
} from "../../../context/OrganizerEventsContext.jsx";

function EventModals() {
  return (
    <>
      <EventDeleteModal />
      <EventFormModal tipo="creazione" />
      <EventFormModal tipo="modifica" />
    </>
  );
}

function EventDeleteModal() {
  const {
    eventoDaEliminare,
    erroreElimina,
    caricamentoElimina,
    chiudiModaleElimina,
    gestisciElimina,
  } = useOrganizerEventsContext();

  if (!eventoDaEliminare) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow border-0">
          <div className="modal-header border-0 pb-0 px-4 pt-4">
            <h5 className="modal-title fw-bold text-danger">
              <i className="bi bi-trash me-2"></i>
              Elimina evento
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={chiudiModaleElimina}
              disabled={caricamentoElimina}
            ></button>
          </div>

          <div className="modal-body px-4 py-4">
            {erroreElimina && (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 rounded-3"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle-fill"></i>
                {erroreElimina}
              </div>
            )}

            <p className="mb-0">
              Sei sicuro di voler eliminare l'evento{" "}
              <strong>{eventoDaEliminare.title}</strong>? Questa azione non puo
              essere annullata.
            </p>
          </div>

          <div className="modal-footer border-0 px-4 pb-4 pt-2">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-3 px-4"
              onClick={chiudiModaleElimina}
              disabled={caricamentoElimina}
            >
              Annulla
            </button>
            <button
              type="button"
              className="btn btn-danger rounded-3 px-4 d-flex align-items-center gap-2"
              onClick={gestisciElimina}
              disabled={caricamentoElimina}
            >
              {caricamentoElimina ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  Eliminazione...
                </>
              ) : (
                <>
                  <i className="bi bi-trash"></i>
                  Elimina
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventFormModal({ tipo }) {
  const context = useOrganizerEventsContext();
  const config = tipo === "creazione" ? context.creazione : context.modifica;

  if (!config.visibile) return null;

  const {
    titolo,
    form,
    errore,
    caricamento,
    anteprimaImmagine,
    nomeImmagine,
    fileInputId,
    minPosti,
    testoBottone,
    testoCaricamento,
    onChange,
    onImageChange,
    onSubmit,
    onClose,
  } = config;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content rounded-4 border-0 shadow">
          <div className="modal-header border-bottom-0 pb-0">
            <h5 className="modal-title fw-bold">{titolo}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body py-3">
            <form onSubmit={onSubmit}>
              {errore && (
                <div className="alert alert-danger" role="alert">
                  {errore}
                </div>
              )}

              <div className="mb-3">
                <img
                  src={anteprimaImmagine || eventsPlaceholder}
                  alt="Anteprima evento"
                  className="w-100 rounded-3 border shadow-sm"
                  style={{ height: "170px", objectFit: "cover" }}
                />
                <div className="d-flex align-items-center gap-2 flex-wrap mt-2">
                  <input
                    type="file"
                    className="d-none"
                    id={fileInputId}
                    name="image"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onImageChange}
                  />
                  <label
                    htmlFor={fileInputId}
                    className="btn btn-outline-primary rounded-3 mb-0"
                  >
                    Scegli la foto
                  </label>
                  <span className="small">
                    {nomeImmagine || "nessuna foto selezionata"}
                  </span>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Titolo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    required
                    maxLength="500"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Categoria</label>
                  <select
                    className="form-select"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    required
                  >
                    <option value="">Seleziona categoria</option>
                    {categorieEvento.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Data</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={form.date}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Citta</label>
                  <select
                    className="form-select"
                    name="location"
                    value={form.location}
                    onChange={onChange}
                    required
                  >
                    <option value="">Seleziona citta</option>
                    {cittaEvento.map((citta) => (
                      <option key={citta} value={citta}>
                        {citta}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Indirizzo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="indirizzo"
                    value={form.indirizzo}
                    onChange={onChange}
                    maxLength="500"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Prezzo</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={form.price}
                    onChange={onChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    Posti Massimi
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="max_seats"
                    value={form.max_seats}
                    onChange={onChange}
                    required
                    min={minPosti}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Descrizione</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="2"
                    value={form.description}
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-4"
                  onClick={onClose}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill px-4"
                  disabled={caricamento}
                >
                  {caricamento ? testoCaricamento : testoBottone}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModals;
