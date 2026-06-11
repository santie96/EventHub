// Toast riutilizzabile per messaggi di successo o errore nel profilo.
// Usa ProfileContext nel profilo, ma accetta props dove viene riusato.
import { useProfileContext } from "../../context/ProfileContext";

function ProfiloToast({ toast: toastProp, onClose }) {
  const profile = useProfileContext();
  const toast = toastProp ?? profile?.toast;
  const chiudiToast = onClose ?? profile?.chiudiToast;

  if (!toast) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        className={`toast show align-items-center text-bg-${toast.tipo} border-0 shadow`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{toast.messaggio}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Chiudi"
            onClick={chiudiToast}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default ProfiloToast;
