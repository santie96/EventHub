// Header della pagina profilo con titolo e bottoni azione.
// Apre le modali leggendo le azioni da ProfileContext.
import { useProfileContext } from "../../../context/ProfileContext";

function ProfileHeader() {
  const { apriModale, apriModaleElimina } = useProfileContext();

  return (
    <div className="d-flex justify-content-between align-items-start mb-4">
      <div className="text-light">
        <h2 className="fw-bold mb-1">
          Il mio <span className="text-secondary">Profilo</span>
        </h2>
        <p className="mb-0">Visualizza i tuoi dati personali</p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-secondary d-flex align-items-center gap-2 rounded-3 shadow-sm"
          onClick={apriModale}
        >
          <i className="bi bi-pencil-square"></i>
          <span className="d-none d-sm-inline">Modifica</span>
        </button>
        <button
          type="button"
          className="btn btn-outline-danger rounded-3 d-flex align-items-center gap-2"
          onClick={apriModaleElimina}
        >
          <i className="bi bi-trash"></i>
          <span className="d-none d-sm-inline">Elimina</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
