// Blocco di aiuto con informazioni per contattare il supporto.
// Completa la sezione assistenza accanto alle FAQ.
import { Link } from "react-router-dom";

function Help() {
  return (
    <div className="card bg-soft-dark border-0 shadow-sm h-100 w-100">
      <div className="card-body text-white d-flex align-items-center justify-content-between gap-4 p-4">
        <div>
          <h2 className="h4 card-title">Hai bisogno di aiuto?</h2>
          <p className="card-text">
            Il nostro team e' disponibile 24/7 per supportarti.
          </p>
          <Link to="/contatti" className="btn btn-secondary">Contattaci</Link>
        </div>

        <i className="bi bi-telephone fs-1 text-secondary"></i>
      </div>
    </div>
  );
}

export default Help;