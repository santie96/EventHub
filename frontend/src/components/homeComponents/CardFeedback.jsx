// Card dei feedback mostrati nella homepage.
// Usa immagini locali e testi statici per le recensioni.
import { feedbacks } from "./homeContent";

function CardFeedback() {
  return feedbacks.map((feedback) => (
    <div
      className="col-12 col-md-6 col-lg-3 animazione-card"
      key={`${feedback.name}-${feedback.city}`}
    >
      <article className="card bg-soft-dark border-0 shadow-sm h-100">
        <div className="card-body text-white d-flex flex-column justify-content-between">
          <p className="card-text feedback-text">{feedback.text}</p>

          <div className="d-flex align-items-center gap-3">
            <img
              src={feedback.image}
              alt={feedback.name}
              className="feedback-avatar"
            />

            <div>
              <h3 className="h6 mb-0">{feedback.name}</h3>
              <small className="text-light opacity-75">{feedback.city}</small>
            </div>
          </div>
        </div>
      </article>
    </div>
  ));
}

export default CardFeedback;
