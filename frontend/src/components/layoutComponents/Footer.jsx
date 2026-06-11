// Footer del sito con link principali e informazioni finali.
// Viene mostrato nel layout pubblico sotto alle pagine.
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="navbar navbar-dark bg-soft-dark text-light py-4 shadow-sm custom-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 text-center text-md-start">
            <NavLink
              className="navbar-brand fw-bold d-flex justify-content-center justify-content-md-start"
              to="/"
            >
              <img
                src="../../src/assets/img/logo.png"
                alt="EventiHub"
                className="img-logo-navbar"
              />
            </NavLink>
            <p className="footer-text text-light py-3 fs-6">
              La piattaforma per scoprire, organizzare e vivere eventi
              indimenticabili.
            </p>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <h6 className="fw-bold text-secondary text-center text-md-start">Navigazione</h6>
            <ul className="navbar-nav justify-content-center align-items-center justify-content-md-start align-items-md-start">
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/">
                  Esplora
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/chi-siamo">
                  Chi siamo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/eventi">
                  Eventi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/contatti">
                  Contatti
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3 text-center text-md-start">
            <p className="text-light mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              <a
                href="mailto:info@eventhub.com"
                className="text-light text-decoration-none"
              >
                info@eventhub.com
              </a>
            </p>

            <p className="text-light mb-3">
              <i className="bi bi-geo-alt-fill me-2"></i>
              P.za del Duomo, 20123 Milano MI
            </p>
          </div>

          <hr
            className="bg-secondary border-0 opacity-50 w-100 my-4"
            style={{ height: "1px" }}
          />

          <div className="text-center text-light fs-6 w-100">
            © {new Date().getFullYear()} EventiHub — Tutti i diritti riservati
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
