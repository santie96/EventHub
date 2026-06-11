// Banner promozionale per invitare l'utente a diventare organizzatore.
// Mostra una call to action verso le pagine di registrazione/accesso.
import { Link } from "react-router-dom";

function BannerOrganizzatore() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="card bg-soft-dark border-0 shadow-sm">
          <div className="card-body text-white d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4 p-4">
            <div>
              <h2 className="h3 card-title">Sei un organizzatore?</h2>
              <p className="card-text mb-0">
                Crea e gestisci i tuoi eventi. Raggiungi il tuo pubblico e fai
                crescere la tua community.
              </p>
            </div>

            <div className="d-flex flex-column align-items-start align-items-md-center gap-3">
              <Link to="/dashboard" className="btn btn-secondary">
                Crea il tuo evento
              </Link>

              <Link
                to="/chi-siamo"
                className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                Scopri di piu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerOrganizzatore;
