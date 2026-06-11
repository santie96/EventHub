// Modale per modificare dati personali e foto profilo.
// Legge form, anteprima immagine e handler da ProfileContext.
import { useProfileContext } from "../../context/ProfileContext";

function ProfiloModificaModal() {
  const {
    form,
    anteprimaFoto,
    nomeFotoProfilo,
    erroreForm,
    caricamento,
    handleChange,
    handleFileChange,
    handleSubmit,
    chiudiModale,
  } = useProfileContext();

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 shadow border-0">
          <div className="modal-header border-0 pb-0 px-4 pt-4">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-pencil-square text-primary me-2"></i>
              Modifica Profilo
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={chiudiModale}
              disabled={caricamento}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body px-4 py-4">
              {erroreForm && (
                <div
                  className="alert alert-danger d-flex align-items-center gap-2 rounded-3"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div>
                    {erroreForm.split("\n").map((errore) => (
                      <div key={errore}>{errore}</div>
                    ))}
                  </div>
                </div>
              )}

              <h6
                className="text-uppercase fw-bold mb-3"
                style={{ fontSize: "0.8rem" }}
              >
                <i className="bi bi-person me-2"></i>Dati Personali
              </h6>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="edit-name" className="form-label fw-semibold">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="edit-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="edit-surname"
                    className="form-label fw-semibold"
                  >
                    Cognome
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="edit-surname"
                    name="surname"
                    value={form.surname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="edit-username"
                    className="form-label fw-semibold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="edit-username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="edit-email"
                    className="form-label fw-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="edit-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="edit-location"
                    className="form-label fw-semibold"
                  >
                    Localita
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="edit-location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="edit-indirizzo"
                    className="form-label fw-semibold"
                  >
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="edit-indirizzo"
                    name="indirizzo"
                    value={form.indirizzo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Foto profilo</label>
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <img
                      src={anteprimaFoto}
                      alt="Anteprima foto profilo"
                      className="rounded-circle border shadow-sm flex-shrink-0"
                      style={{
                        width: "72px",
                        height: "72px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <input
                        type="file"
                        className="d-none"
                        id="edit-img-profile"
                        name="img_profile"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="edit-img-profile"
                        className="btn btn-outline-primary rounded-3 mb-0"
                      >
                        Scegli la foto
                      </label>
                      <span className="small">{nomeFotoProfilo}</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-3" />
              <h6
                className="text-uppercase fw-bold mb-3"
                style={{ fontSize: "0.8rem" }}
              >
                <i className="bi bi-shield-lock me-2"></i>Cambio Password
                <small className="fw-normal ms-2">
                  (lascia vuoto per non modificarla)
                </small>
              </h6>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="edit-password"
                    className="form-label fw-semibold"
                  >
                    Nuova Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="edit-password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="********"
                    autoComplete="new-password"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="edit-conferma"
                    className="form-label fw-semibold"
                  >
                    Conferma Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="edit-conferma"
                    name="confermaPassword"
                    value={form.confermaPassword}
                    onChange={handleChange}
                    placeholder="********"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 px-4 pb-4 pt-2">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-3 px-4"
                onClick={chiudiModale}
                disabled={caricamento}
              >
                Annulla
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-3 px-4 d-flex align-items-center gap-2"
                disabled={caricamento}
              >
                {caricamento ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                    Aggiornamento...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg"></i>
                    Aggiorna
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfiloModificaModal;
