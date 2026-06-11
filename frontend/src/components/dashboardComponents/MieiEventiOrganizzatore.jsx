// Area dashboard per organizzatori/admin che gestiscono gli eventi creati.
// Il context gestisce dati e azioni: questo file compone solo la pagina.
import ProfiloToast from "./ProfiloToast";
import EventModals from "./organizerEventsComponents/EventModals";
import OrganizerEventsEmptyState from "./organizerEventsComponents/OrganizerEventsEmptyState";
import OrganizerEventsHeader from "./organizerEventsComponents/OrganizerEventsHeader";
import OrganizerEventsList from "./organizerEventsComponents/OrganizerEventsList";
import OrganizerEventsTable from "./organizerEventsComponents/OrganizerEventsTable";
import {
  OrganizerEventsProvider,
  useOrganizerEventsContext,
} from "../../context/OrganizerEventsContext.jsx";

function MieiEventiOrganizzatore() {
  return (
    <OrganizerEventsProvider>
      <OrganizerEventsPageContent />
    </OrganizerEventsProvider>
  );
}

function OrganizerEventsPageContent() {
  const { caricamento, errore, eventi, toast, nascondiToast } =
    useOrganizerEventsContext();

  if (caricamento) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (errore) {
    return <div className="alert alert-danger m-4">{errore}</div>;
  }

  return (
    <div className="miei-eventi-organizzatore">
      <ProfiloToast toast={toast} onClose={nascondiToast} />
      <OrganizerEventsHeader />

      {eventi.length === 0 ? (
        <OrganizerEventsEmptyState />
      ) : (
        <OrganizerEventsViews />
      )}

      <EventModals />
    </div>
  );
}

function OrganizerEventsViews() {
  return (
    <>
      <OrganizerEventsTable />
      <OrganizerEventsList />
    </>
  );
}

export default MieiEventiOrganizzatore;
