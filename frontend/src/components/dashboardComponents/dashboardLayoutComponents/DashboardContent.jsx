// Decide quale contenuto mostrare nella dashboard in base alla tab attiva.
// La tab "miei eventi" cambia componente in base al ruolo utente.
import { useDashboardContext } from "../../../context/DashboardContext";
import MieiEventiOrganizzatore from "../MieiEventiOrganizzatore";
import MieiEventiUtente from "../MieiEventiUtente";
import ProfiloPagina from "../ProfiloPagina";
import RegistrazioniUtenti from "../RegistrazioniUtenti";

function DashboardContent() {
  const { activeTab, user } = useDashboardContext();

  return (
    <div className="p-4">
      {activeTab === "profilo" && <ProfiloPagina />}
      {activeTab === "miei-eventi" &&
        (user.role === "partecipant" ? (
          <MieiEventiUtente />
        ) : (
          <MieiEventiOrganizzatore />
        ))}
      {activeTab === "registrazioni" && <RegistrazioniUtenti />}
    </div>
  );
}

export default DashboardContent;
