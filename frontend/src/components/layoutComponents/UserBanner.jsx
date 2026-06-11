// Menu compatto dell'utente loggato con accesso alla dashboard.
// Mostra avatar, nome e azioni rapide di account.
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import profilePlaceholder from "../../assets/img/profile_placeholder.webp";

function UserBanner() {
  const { utente, logout } = useAuth();
  const navigate = useNavigate();

  const nomeCompleto = [utente?.name, utente?.surname]
    .filter(Boolean)
    .join(" ");
  const nomeVisualizzato = nomeCompleto || utente?.username || "Nome Utente";
  const immagineProfilo = utente?.img_profile || profilePlaceholder;

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/", { replace: true });
  };

  if (!utente) {
    return null;
  }

  return (
    <div className="user-banner dropdown text-end">
      <a
        href="#"
        className="user-banner__toggle navbar-user-toggler d-flex gap-2 align-items-center link-body-emphasis text-decoration-none"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h6 className="user-banner__name mb-0 text-white fw-bold">
          {nomeVisualizzato}
        </h6>
        <img
          src={immagineProfilo}
          alt="Immagine profilo utente"
          className="user-banner__avatar rounded-circle"
        />
      </a>
      <ul className="user-banner__menu dropdown-menu dropdown-menu-end shadow">
        <li className="dropdown-header user-banner__header mb-2">
          <div className="small text-uppercase fw-bold">{utente.role}</div>
          <div className="fw-bold">{nomeVisualizzato}</div>
        </li>
        <li>
          <NavLink
            className="dropdown-item d-flex align-items-center gap-2 py-2"
            to="/dashboard"
          >
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center gap-2 py-2 user-banner__logout"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserBanner;
