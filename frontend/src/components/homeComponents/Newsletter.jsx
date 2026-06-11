// Sezione newsletter della homepage con campo email e call to action.
// Serve come invito statico all'iscrizione agli aggiornamenti.
import { useState } from "react";
import ProfiloToast from "../dashboardComponents/ProfiloToast";

function Newsletter() {
  const [toast, setToast] = useState(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const iscriviNewsletter = (e) => {
    e.preventDefault();
    const email = e.currentTarget.querySelector("#newsletter");
    email.setCustomValidity("");

    if (!emailRegex.test(email.value.trim())) {
      email.setCustomValidity("Inserisci un indirizzo email valido.");
    }

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    setToast({
      messaggio: "Grazie per l'iscrizione",
      tipo: "success",
    });
    e.currentTarget.reset();
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <section className="py-5">
      <ProfiloToast toast={toast} onClose={() => setToast(null)} />

      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-7 d-flex align-items-center gap-3">
            <i className="bi bi-envelope fs-1 text-secondary"></i>

            <div>
              <h2 className="h4 text-light">Non perderti nulla!</h2>
              <p className="mb-0">
                Iscriviti alla newsletter e ricevi i migliori eventi selezionati
                direttamente <br /> nella tua inbox.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <form className="d-flex" onSubmit={iscriviNewsletter} noValidate>
              <div className="form-floating flex-fill">
                <input
                  className="form-control rounded-end-0"
                  type="email"
                  id="newsletter"
                  placeholder=" "
                  onInput={(e) => e.target.setCustomValidity("")}
                  required
                />
                <label htmlFor="newsletter">La tua email</label>
              </div>

              <button className="btn btn-secondary rounded-start-0">
                Iscriviti
              </button>
            </form>

            <p className="small text-light opacity-75 mt-2 mb-0">
              Nessuno spam, promesso. Puoi annullare l'iscrizione in qualsiasi
              momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
