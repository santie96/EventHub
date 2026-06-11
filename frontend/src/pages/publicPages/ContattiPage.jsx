import { useState } from "react";
import useSEO from "../../hooks/useSEO";
import ProfiloToast from "../../components/dashboardComponents/ProfiloToast";

const ContattiPage = () => {
  const [toast, setToast] = useState(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useSEO({
    title: "Contatti",
    description: "Contatta il team di EventHub per assistenza, informazioni o collaborazioni."
  });

  const inviaMessaggio = (e) => {
    e.preventDefault();
    const email = e.currentTarget.querySelector("#email");
    email.setCustomValidity("");

    if (!emailRegex.test(email.value.trim())) {
      email.setCustomValidity("Inserisci un indirizzo email valido.");
    }

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    setToast({
      messaggio: "Grazie per averci contattato!",
      tipo: "success",
    });
    e.currentTarget.reset();
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="container py-5">
      <ProfiloToast toast={toast} onClose={() => setToast(null)} />

      <div className="row justify-content-center text-center mb-5">
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold mb-3 text-secondary">Contattaci</h1>
          <p className="lead text-white">
            Siamo qui per aiutarti! Hai domande sui nostri eventi o hai bisogno
            di assistenza? Compila il modulo sottostante o utilizza i nostri
            recapiti.
          </p>
        </div>
      </div>

      <div className="row g-5">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100 p-4">
            <div className="card-body">
              <h3 className="h4 fw-bold mb-4">I nostri recapiti</h3>

              <div className="d-flex align-items-center mb-4">
                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bi bi-geo-alt fs-3"></i>
                </div>
                <div>
                  <h5 className="mb-1 fw-semibold">Indirizzo</h5>
                  <p className="mb-0">
                    Via Roma, 123
                    <br />
                    00100 Roma (RM), Italia
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div
                  className="bg-success bg-opacity-10 text-success rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bi bi-telephone fs-3"></i>
                </div>
                <div>
                  <h5 className="mb-1 fw-semibold">Telefono</h5>
                  <p className="mb-0">+39 06 12345678</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div
                  className="bg-info bg-opacity-10 text-info rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bi bi-envelope fs-3"></i>
                </div>
                <div>
                  <h5 className="mb-1 fw-semibold">Email</h5>
                  <p className="mb-0">info@eventhub.it</p>
                </div>
              </div>

              <hr className="my-5" />

              <h4 className="h5 fw-bold mb-3">Seguici sui social</h4>
              <div className="d-flex gap-3">
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px" }}
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-info rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px" }}
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px" }}
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px" }}
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4">
            <div className="card-body">
              <h3 className="h4 fw-bold mb-4">Inviaci un messaggio</h3>
              <form onSubmit={inviaMessaggio} noValidate>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nome" className="form-label fw-medium">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      placeholder="Il tuo nome"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="cognome" className="form-label fw-medium">
                      Cognome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cognome"
                      placeholder="Il tuo cognome"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-medium">
                    Indirizzo Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="nome@esempio.com"
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="oggetto" className="form-label fw-medium">
                    Oggetto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="oggetto"
                    placeholder="Di cosa vuoi parlarci?"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="messaggio" className="form-label fw-medium">
                    Messaggio
                  </label>
                  <textarea
                    className="form-control"
                    id="messaggio"
                    rows="5"
                    placeholder="Scrivi qui il tuo messaggio..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary btn-lg w-100 fw-bold"
                >
                  <i className="bi bi-send me-2"></i> Invia Messaggio
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContattiPage;
