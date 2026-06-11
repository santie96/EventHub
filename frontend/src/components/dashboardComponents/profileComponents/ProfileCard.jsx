// Card principale del profilo con avatar, ruolo e campi utente.
// Legge i dati gia preparati da ProfileContext.
import { useProfileContext } from "../../../context/ProfileContext";
import ProfiloCampo from "../ProfiloCampo";

function ProfileCard() {
  const { nomeCompleto, immagineProfilo, roleBadge, campi } =
    useProfileContext();

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <div className="bg-primary bg-gradient text-white text-center py-5 px-3">
        <img
          src={immagineProfilo}
          alt={nomeCompleto || "Profilo"}
          className="profilo-avatar rounded-circle border border-white shadow mb-3"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <h4 className="mb-2 fw-bold">{nomeCompleto || "Utente"}</h4>
        <span
          className={`badge ${roleBadge.cls} rounded-pill px-3 py-2 shadow-sm fs-6`}
        >
          <i className={`bi ${roleBadge.icon} me-2`}></i>
          {roleBadge.label}
        </span>
      </div>

      <div className="card-body bg-light p-4 p-md-5">
        <div className="row g-4">
          {campi.map((campo) => (
            <ProfiloCampo key={campo.label} campo={campo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
