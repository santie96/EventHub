// Sidebar desktop completa: logo, profilo, navigazione e azioni finali.
// Bootstrap la mostra solo da lg in su con d-none d-lg-flex.
import { NavLink } from "react-router-dom";
import profilePlaceholder from "../../../assets/img/profile_placeholder.webp";
import { useDashboardContext } from "../../../context/DashboardContext";

function DashboardSidebar() {
  const {
    logo,
    user,
    roleBadge,
    activeTab,
    cambiaTab,
    tornaAlSito,
    esciDashboard,
  } = useDashboardContext();

  const getClassName = (tab) =>
    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${activeTab === tab
      ? "active shadow-sm"
      : "text-white-50 link-light bg-transparent"
    }`;

  return (
    <aside className="dashboard-sidebar d-none d-lg-flex flex-column bg-dark text-white shadow-sm overflow-y-auto custom-scrollbar">
      <div className="sidebar-brand px-3 py-4 text-center">
        <NavLink to="/" className="text-white text-decoration-none d-block">
          <img src={logo} alt="EventiHub Logo" className="dashboard-logo" />
        </NavLink>
      </div>

      <hr className="mx-3 my-0 opacity-25" />

      <div className="text-center px-3 py-4">
        <img
          src={user.avatar || profilePlaceholder}
          alt={user.name}
          className="sidebar-avatar rounded-circle mb-3 border border-primary border-opacity-25 shadow-sm"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <h6 className="mb-1 fw-bold text-white">{user.name}</h6>
        <small className="text-white-50 d-block mb-3">{user.email}</small>
        <span className={`badge ${roleBadge.cls} rounded-pill px-3 shadow-sm`}>
          {roleBadge.label}
        </span>
      </div>

      <hr className="mx-3 my-0 opacity-25" />

      <nav className="sidebar-nav flex-grow-1 flex-shrink-0 px-3 py-3">
        <ul className="nav nav-pills flex-column gap-1">
          <li className="nav-item">
            <button
              onClick={() => cambiaTab("profilo")}
              className={getClassName("profilo")}
            >
              <i className="bi bi-person-fill fs-5"></i>
              <span>Profilo</span>
            </button>
          </li>

          <li className="nav-item">
            <button
              onClick={() => cambiaTab("miei-eventi")}
              className={getClassName("miei-eventi")}
            >
              <i className="bi bi-calendar2-week-fill fs-5"></i>
              <span>I Miei Eventi</span>
            </button>
          </li>

          {(user.role === "admin" || user.role === "organizer") && (
            <li className="nav-item">
              <button
                onClick={() => cambiaTab("registrazioni")}
                className={getClassName("registrazioni")}
              >
                <i className="bi bi-people-fill fs-5"></i>
                <span>Registrazioni</span>
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div className="sidebar-footer flex-shrink-0 px-3 py-3 bg-black bg-opacity-10 mt-auto">
        <button
          type="button"
          onClick={tornaAlSito}
          className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light mb-1 border-0 w-100 text-start bg-transparent"
        >
          <i className="bi bi-arrow-left-circle fs-5"></i>
          <span>Torna al sito</span>
        </button>
        <button
          onClick={esciDashboard}
          className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-danger border-0 w-100 text-start bg-transparent"
        >
          <i className="bi bi-box-arrow-left fs-5"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
