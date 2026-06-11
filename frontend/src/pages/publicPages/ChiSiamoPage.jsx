import { Link } from "react-router-dom";
import CardUtenti from "../../components/sharedComponents/CardUtenti";
import { useAuth } from "../../context/AuthContext";
import useSEO from "../../hooks/useSEO";

const imageIevgeniia = "./src/assets/img/foto_ievgeniia.webp";
const imageSanti = "./src/assets/img/foto_santi.webp";
const imageAlessandro = "./src/assets/img/foto_alessandro.webp";
const imageGiorgio = "./src/assets/img/foto_giorgio.webp";

const ChiSiamoPage = () => {
  const { token } = useAuth();

  useSEO({
    title: "Chi Siamo",
    description: "Scopri il team e i valori dietro EventHub, la piattaforma che connette le persone attraverso esperienze indimenticabili."
  });

  return (
    <div className="chi-siamo-page">
      <section className="py-5 text-center">
        <div className="container mt-4">
          <img
            src="../../src/assets/img/logo.png"
            alt="EventiHub"
            className="img-fluid w-75"
          />
          <div className="row justify-content-center text-white">
            <div className="col-md-8">
              <p className="mb-0">
                La nostra missione è connettere le persone attraverso esperienze
                indimenticabili. Semplifichiamo l'organizzazione e la
                partecipazione agli eventi, offrendo una piattaforma intuitiva e
                completa per creatori e partecipanti.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-secondary">I Nostri Valori</h2>
            <p className="text-white">
              Cosa ci guida ogni giorno nella creazione della nostra
              piattaforma.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="animazione-card card bg-soft-dark h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body text-white">
                  <div className="fs-1 text-secondary mb-3">
                    <i className="bi bi-lightbulb"></i>
                  </div>
                  <h4 className="card-title fw-bold">Innovazione</h4>
                  <p className="card-text">
                    Sviluppiamo costantemente nuove funzionalità per rendere
                    l'esperienza sempre più fluida e all'avanguardia.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="animazione-card card bg-soft-dark h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body text-white">
                  <div className="fs-1 text-secondary mb-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h4 className="card-title fw-bold">Affidabilità</h4>
                  <p className="card-text">
                    Garantiamo una piattaforma sicura e performante per
                    organizzatori e partecipanti, senza imprevisti.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="animazione-card card bg-soft-dark h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body text-white">
                  <div className="fs-1 text-secondary mb-3">
                    <i className="bi bi-people"></i>
                  </div>
                  <h4 className="card-title fw-bold">Community</h4>
                  <p className="card-text">
                    Crediamo nel potere della condivisione e nel valore delle
                    connessioni umane attraverso gli eventi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-secondary">Il Nostro Team</h2>
            <p className="text-white">Le menti creative dietro EventHub.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              {
                name: "Ievgeniia",
                role: "Admin",
                image: imageIevgeniia,
                github: "https://github.com/Ievgeniia23",
              },
              {
                name: "Santi",
                role: "Admin",
                image: imageSanti,
                github: "https://github.com/santie96",
              },
              {
                name: "Alessandro",
                role: "Admin",
                image: imageAlessandro,
                github: "https://github.com/AlessRizz",
              },
              {
                name: "Giorgio",
                role: "Admin",
                image: imageGiorgio,
                github: "https://github.com/joxDev12",
              },
            ].map((member, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <CardUtenti
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  github={member.github}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark text-white py-5 text-center">
        <div className="container py-4">
          <h2 className="fw-bold mb-4">
            Pronto a vivere la tua prossima esperienza?
          </h2>
          <p className="lead mb-4">
            Unisciti a migliaia di utenti che usano EventHub ogni giorno.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/eventi"
              className="btn btn-secondary animazione-button btn-lg px-4 rounded-pill"
            >
              Esplora Eventi
            </Link>
            {!token && (
              <Link
                to="/register"
                className="btn btn-outline-light animazione-button btn-lg px-4 rounded-pill"
              >
                Registrati Ora
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamoPage;
