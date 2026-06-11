// Pagina profilo dentro dashboard con dati, modifica ed eliminazione account.
// I dati e gli handler sono gestiti da ProfileContext.
import {
  ProfileProvider,
  useProfileContext,
} from "../../context/ProfileContext";
import ProfiloEliminaModal from "./ProfiloEliminaModal";
import ProfiloModificaModal from "./ProfiloModificaModal";
import ProfiloToast from "./ProfiloToast";
import ProfileCard from "./profileComponents/ProfileCard";
import ProfileHeader from "./profileComponents/ProfileHeader";

function ProfiloContenuto() {
  const { mostraModale, mostraModaleElimina } = useProfileContext();

  return (
    <>
      <ProfiloToast />
      <ProfileHeader />
      <ProfileCard />
      {mostraModale && <ProfiloModificaModal />}
      {mostraModaleElimina && <ProfiloEliminaModal />}
    </>
  );
}

function ProfiloPagina() {
  return (
    <ProfileProvider>
      <ProfiloContenuto />
    </ProfileProvider>
  );
}

export default ProfiloPagina;
