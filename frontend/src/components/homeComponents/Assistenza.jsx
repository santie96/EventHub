// Sezione assistenza della homepage con FAQ e contatti di aiuto.
// Combina i componenti Faq e Help in un unico blocco.
import Faq from "./Faq";
import Help from "./Help";

function Assistenza() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="h4 text-light mb-4">Domande frequenti</h2>
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-md-7 d-flex">
            <Faq />
          </div>

          <div className="col-12 col-md-5 d-flex">
            <Help />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Assistenza;
