// Area dashboard per vedere le registrazioni agli eventi.
// Admin e organizzatori vedono iscritti e informazioni dei partecipanti.
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { eventsAPI, registrationsAPI } from "../../services/api";
import profilePlaceholder from "../../assets/img/profile_placeholder.webp";

const getImmagineUtente = (reg) =>
  reg.user_img_profile || reg.img_profile || profilePlaceholder;

function RegistrazioniUtenti() {
  const { utente, token } = useAuth();
  const [registrazioni, setRegistrazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrazioni = async () => {
      try {
        setLoading(true);
        setError(null);

        let tutteRegistrazioni = [];

        if (utente?.role === "admin") {
          const res = await registrationsAPI.getAll();
          tutteRegistrazioni = res.slice(0, 50);
        } else if (utente?.role === "organizer") {
          // 1. Fetch eventi dell'organizzatore
          try {
            const eventi = await eventsAPI.getByOrganizerId(utente.id);

            if (eventi && eventi.length > 0) {
              // 2. Fetch registrazioni per ogni evento
              const promesseRegistrazioni = eventi.map(async (evento) => {
                try {
                  return await registrationsAPI.getByEventId(evento.id);
                } catch (err) {
                  // Se l'errore è 404 (nessuna registrazione), ritorniamo array vuoto
                  if (err.status === 404) return [];
                  throw err;
                }
              });

              const arrayDiArray = await Promise.all(promesseRegistrazioni);
              tutteRegistrazioni = arrayDiArray.flat();

              // Ordiniamo per data di registrazione (dal più recente)
              tutteRegistrazioni.sort(
                (a, b) => new Date(b.registered_at) - new Date(a.registered_at),
              );
            }
          } catch (err) {
            if (err.status !== 404) throw err;
            // Se getByOrganizerId dà 404, significa che non ha eventi, quindi 0 registrazioni
            tutteRegistrazioni = [];
          }
        }

        setRegistrazioni(tutteRegistrazioni);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (utente && token) {
      fetchRegistrazioni();
    }
  }, [utente, token]);

  const eliminaRegistrazione = async (id) => {
    try {
      await registrationsAPI.elimina(id);
      setRegistrazioni((prev) => prev.filter((reg) => reg.id !== id));
    } catch (err) {
      setError(err.message || "Errore nella cancellazione della registrazione");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="registrazioni-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-white mb-0">
          <i className="bi bi-people-fill me-2 text-secondary"></i>
          {utente?.role === "admin"
            ? "Tutte le Registrazioni"
            : "Registrazioni ai tuoi Eventi"}
        </h2>
      </div>

      {registrazioni.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
          <div className="mb-3">
            <i className="bi bi-inbox" style={{ fontSize: "3rem" }}></i>
          </div>
          <h4>Nessuna registrazione trovata</h4>
          <p className="mb-0">Non ci sono ancora utenti registrati.</p>
        </div>
      ) : (
        <>
          {/* Vista Desktop (Tabella) */}
          <div className="table-responsive bg-white rounded-4 shadow-sm border d-none d-xl-block">
            <table className="table table-hover table-borderless align-middle mb-0">
              <thead className="table-primary border-bottom">
                <tr>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Utente</th>
                  <th className="px-4 py-3">Evento</th>
                  <th className="px-4 py-3 text-center">Posti</th>
                  {utente?.role === "organizer" && (
                    <th className="px-4 py-3 text-end">Azioni</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {registrazioni.map((reg) => (
                  <tr key={reg.id} className="border-bottom">
                    <td className="px-4 py-3">
                      {new Date(reg.registered_at).toLocaleDateString("it-IT", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={getImmagineUtente(reg)}
                          alt={reg.user_fullname}
                          className="rounded-circle border shadow-sm flex-shrink-0"
                          style={{
                            width: "46px",
                            height: "46px",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.src = profilePlaceholder;
                          }}
                        />
                        <div>
                          <div className="fw-bold">{reg.user_fullname}</div>
                          <small>{reg.user_email}</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="fw-bold text-primary">
                        {reg.event_title}
                      </div>
                      <small>
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {reg.event_location}
                      </small>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge bg-primary rounded-pill px-3 py-2">
                        {reg.seats}
                      </span>
                    </td>
                    {utente?.role === "organizer" && (
                      <td className="px-4 py-3 text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={() => eliminaRegistrazione(reg.id)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Elimina
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista Mobile (Card) */}
          <div className="d-xl-none row g-3">
            {registrazioni.map((reg) => (
              <div key={reg.id} className="col-12">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={getImmagineUtente(reg)}
                        alt={reg.user_fullname}
                        className="rounded-circle border shadow-sm flex-shrink-0"
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = profilePlaceholder;
                        }}
                      />
                      <div className="overflow-hidden">
                        <div className="fw-bold text-truncate">
                          {reg.user_fullname}
                        </div>
                        <div className="small text-muted text-truncate">
                          {reg.user_email}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 p-3 bg-light rounded-3">
                      <div className="fw-bold text-primary mb-1">
                        {reg.event_title}
                      </div>
                      <div className="small text-muted">
                        <i className="bi bi-geo-alt-fill me-1 text-danger"></i>
                        {reg.event_location}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2">
                      <div className="small text-muted">
                        <i className="bi bi-calendar-event me-2 text-primary"></i>
                        {new Date(reg.registered_at).toLocaleDateString(
                          "it-IT",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="small text-muted me-2">Posti:</span>
                        <span className="badge bg-primary rounded-pill px-3 py-2">
                          {reg.seats}
                        </span>
                      </div>
                    </div>

                    {utente?.role === "organizer" && (
                      <button
                        type="button"
                        className="btn btn-outline-danger rounded-pill w-100 mt-3"
                        onClick={() => eliminaRegistrazione(reg.id)}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Elimina registrazione
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RegistrazioniUtenti;
