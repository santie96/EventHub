import { Link } from "react-router-dom";

function badgeColore(categoria) {
  switch (categoria) {
    case "Musica":
      return "bg-primary";
    case "Cultura e Spettacolo":
      return "bg-warning text-dark";
    case "Sport":
      return "bg-success";
    case "Tecnologia":
      return "bg-info text-dark";
    default:
      return "bg-secondary";
  }
}

function CardListEvent({ event }) {
  if (!event) return null;

  const {
    id,
    title,
    image,
    category,
    description,
    location,
    price,
    date
  } = event;
  const dataEvento = new Date(date);
  const giornoEvento = String(dataEvento.getDate()).padStart(2, "0");
  const meseEvento = dataEvento.toLocaleDateString("it-IT", { month: "short" });

  return (
    <div className="h-100 px-2">
      <Link to={`/eventi/${id}`} className="text-decoration-none h-100 d-block">
        <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
          <div className="card-body text-white p-3">
            <div className="position-relative mb-3">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="bg-secondary rounded d-flex align-items-center justify-content-center"
                  style={{ width: '100%', height: '160px' }}
                >
                  <i className="bi bi-image text-white fs-1"></i>
                </div>
              )}
              <span className="position-absolute bottom-0 start-0 m-2 bg-light text-dark rounded-2 d-flex flex-column align-items-center justify-content-center shadow-sm lh-1" style={{ width: "42px", height: "46px" }}>
                <span className="fw-bold small">{giornoEvento}</span>
                <span className="x-small text-uppercase fw-semibold">{meseEvento}</span>
              </span>
              <span className={`badge ${badgeColore(category)} position-absolute top-0 start-0 m-2`}>
                {category}
              </span>
            </div>

            <h6 className="card-title text-truncate mb-2" title={title}>{title}</h6>
            <p className="card-text text-truncate-2 small mb-3" style={{ height: '40px' }}>{description}</p>

            <div className="d-flex flex-column gap-1 mt-auto">
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-geo-alt text-secondary small"></i>
                <span className="x-small text-truncate">{location}</span>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-coin text-secondary small"></i>
                <span className="fw-bold small">{price === "0.00" ? 'Gratuito' : `€ ${price}`}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default CardListEvent;

