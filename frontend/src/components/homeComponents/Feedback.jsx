// Sezione che raccoglie le recensioni degli utenti.
// Renderizza il componente CardFeedback nella homepage.
import CardFeedback from "./CardFeedback";

function Feedback() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="h4 text-center text-light mb-4">Cosa dicono di noi</h2>

        <div className="row g-4">
          <CardFeedback />
        </div>
      </div>
    </section>
  );
}

export default Feedback;
