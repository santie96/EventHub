// Navigazione mobile della dashboard: topbar e offcanvas Bootstrap.
// La visibilita responsive resta tutta nelle classi Bootstrap.
import profilePlaceholder from "../../../assets/img/profile_placeholder.webp";
import { useDashboardContext } from "../../../context/DashboardContext";

function DashboardNav() {
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
    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${
      activeTab === tab
        ? "active shadow-sm"
        : "text-white-50 link-light bg-transparent"
    }`;

  return (
    <>
      <header className="dashboard-topbar d-lg-none d-flex align-items-center justify-content-between px-3 py-2">
        <button
          className="btn btn-outline-light btn-sm"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          <i className="bi bi-list fs-5"></i>
        </button>
        <img src={logo} alt="EventiHub Logo" className="dashboard-topbar-logo" />
        <div style={{ width: "32px" }}></div>
      </header>

      <div
        className="offcanvas offcanvas-start dashboard-offcanvas d-lg-none"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header bg-dark justify-content-center position-relative px-3 py-4">
          <h5 className="offcanvas-title text-white mb-0">
            <img
              src={logo}
              alt="EventiHub Logo"
              className="dashboard-offcanvas-logo"
            />
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body p-0 bg-dark text-white d-flex flex-column">
          <div className="text-center px-3 py-4">
            <img
              src={user.avatar || profilePlaceholder}
              alt={user.name}
              className="sidebar-avatar rounded-circle mb-3 border border-primary border-opacity-25 shadow-sm"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <h6 className="mb-1 fw-bold text-white">{user.name}</h6>
            <small className="text-white-50 d-block mb-3">{user.email}</small>
            <span
              className={`badge ${roleBadge.cls} rounded-pill px-3 shadow-sm`}
            >
              {roleBadge.label}
            </span>
          </div>

          <hr className="mx-3 opacity-25" />

          <nav className="sidebar-nav flex-grow-1 flex-shrink-0 px-3 py-3">
            <ul className="nav nav-pills flex-column gap-1">
              <li className="nav-item">
                <button
                  onClick={() => cambiaTab("profilo")}
                  className={getClassName("profilo")}
                  data-bs-dismiss="offcanvas"
                >
                  <i className="bi bi-person-fill fs-5"></i>
                  <span>Profilo</span>
                </button>
              </li>

              <li className="nav-item">
                <button
                  onClick={() => cambiaTab("miei-eventi")}
                  className={getClassName("miei-eventi")}
                  data-bs-dismiss="offcanvas"
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
                    data-bs-dismiss="offcanvas"
                  >
                    <i className="bi bi-people-fill fs-5"></i>
                    <span>Registrazioni</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div className="sidebar-footer flex-shrink-0 px-3 py-3 bg-black bg-opacity-10 mt-auto">
            <hr className="my-2 opacity-25" />
            <button
              type="button"
              onClick={tornaAlSito}
              className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light mb-1 border-0 w-100 text-start bg-transparent"
              data-bs-dismiss="offcanvas"
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
        </div>
      </div>
    </>
  );
}

export default DashboardNav;
