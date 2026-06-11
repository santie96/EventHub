// Singolo campo informativo del profilo utente.
// Mostra icona, label e valore dentro la card profilo.
function ProfiloCampo({ campo }) {
  return (
    <div className="col-12 col-md-6">
      <div className="card border-0 shadow-sm h-100 profilo-campo">
        <div className="card-body d-flex align-items-center gap-4 p-3 p-xl-4">
          <div
            className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "56px", height: "56px" }}
          >
            <i className={`bi ${campo.icona} fs-3`}></i>
          </div>
          <div className="min-width-0">
            <small className="text-uppercase fw-bold d-block mb-1">
              {campo.label}
            </small>
            <span className="fw-semibold text-dark fs-5 text-break">
              {campo.valore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfiloCampo;
