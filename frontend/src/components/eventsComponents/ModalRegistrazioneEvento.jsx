import { useState } from "react";
import { useRegistrations } from "../../context/RegistrationsContext";
import { registrationsAPI } from "../../services/api";

const ModalRegistrazioneEvento = ({
  show,
  onClose,
  evento,
  onAcquistoCompletato,
  onSuccessoRegistrazione,
}) => {
  const [posti, setPosti] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState("");

  const maxPrenotabili = evento.seats_available;
  const { caricaRegistrazioniEvento } = useRegistrations();

  async function handleSubmit() {
    if (loading) return;

    if (posti < 1) {
      setErrore("Inserisci almeno 1 posto");
      return;
    }

    if (posti > maxPrenotabili) {
      setErrore(`Puoi prenotare massimo ${maxPrenotabili} posti`);
      return;
    }
    try {
      setLoading(true);
      setErrore("");

      await registrationsAPI.crea({ event_id: evento.id, seats: posti });

      onAcquistoCompletato?.(posti);
      onSuccessoRegistrazione?.();
      caricaRegistrazioniEvento(evento.id);
      onClose();
    } catch (err) {
      setErrore(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-hidden={!show}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Registrazione Evento</h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <h5 className="fw-bold mb-3">{evento.title}</h5>

              <p className="text-muted mb-2">
                <i className="bi bi-calendar3 me-2 text-primary"></i>
                {new Date(evento.date).toLocaleDateString("it-IT")}
              </p>

              <p className="text-muted mb-4">
                <i className="bi bi-geo-alt me-2 text-danger"></i>
                {evento.location}
              </p>

              <p>{evento.description}</p>

              <div className="d-flex align-items-center gap-2 mt-3">
                <label className="form-label mb-0">Numero posti</label>

                <input
                  type="number"
                  min="1"
                  max={maxPrenotabili}
                  className="form-control form-control-sm text-center"
                  style={{ width: "70px" }}
                  value={posti}
                  onChange={(e) => setPosti(Number(e.target.value))}
                />
              </div>

              {!evento.is_free && (
                <p className="mt-3 fw-semibold">
                  Totale: {(posti * Number(evento.price)).toFixed(2)} €
                </p>
              )}

              {errore && (
                <div className="alert alert-danger mt-3">{errore}</div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={onClose}
              >
                Annulla
              </button>

              <button
                type="button"
                className="btn btn-success"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Invio..." : "Acquista"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ModalRegistrazioneEvento;
