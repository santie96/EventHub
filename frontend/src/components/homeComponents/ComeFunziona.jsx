// Sezione homepage che spiega i passaggi base di EventHub.
// Presenta il funzionamento del sito con blocchi informativi.
import { homeSteps } from "./homeContent";

function ComeFunziona() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center text-light mb-5">Come funziona</h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {homeSteps.map((step) => (
            <div className="col" key={step.title}>
              <article className="card bg-soft-dark border-0 h-100 text-center animazione-card">
                <div className="step-icon">
                  <i className={`bi ${step.icon}`}></i>
                </div>
                <div className="card-body text-white">
                  <h3 className="h5 card-title">{step.title}</h3>
                  <p className="card-text">{step.text}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComeFunziona;
