// Blocco FAQ con domande frequenti e risposte rapide.
// Viene usato dentro la sezione Assistenza della homepage.
import { faqItems } from "./homeContent";

function Faq() {
  return (
    <div className="accordion w-100" id="homeFaq">
      {faqItems.map((item, index) => {
        const collapseId = `homeFaq-${item.id}`;
        const headingId = `homeFaq-heading-${item.id}`;

        return (
          <div className="accordion-item bg-secondary" key={item.id}>
            <h3 className="accordion-header" id={headingId}>
              <button
                className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded={index === 0}
                aria-controls={collapseId}
              >
                {item.question}
              </button>
            </h3>

            <div
              id={collapseId}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              aria-labelledby={headingId}
              data-bs-parent="#homeFaq"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Faq;
