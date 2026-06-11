// Stato vuoto della sezione eventi organizzatore.
// Viene mostrato quando l'organizzatore non ha ancora eventi da gestire.
function OrganizerEventsEmptyState() {
  return (
    <div className="text-center py-5 bg-light rounded-4">
      <i className="bi bi-calendar-plus fs-1 mb-3 d-block"></i>
      <h5>Nessun evento creato</h5>
      <p>Non hai ancora creato nessun evento.</p>
    </div>
  );
}

export default OrganizerEventsEmptyState;
