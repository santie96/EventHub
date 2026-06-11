// Card usata nella pagina Chi siamo per mostrare una persona.
// Riceve nome, ruolo, immagine e link GitHub.
const CardUtenti = ({ name, role, image, github }) => {
  return (
    <div className="team-flip-card h-100">
      <div className="team-flip-card__inner h-100">
        <div className="team-flip-card__front animazione-card card bg-soft-dark border-0 shadow-sm text-center overflow-hidden h-100">
          <div className="bg-secondary bg-opacity-10">
            <img src={image} alt={name} className="img-fluid img-proportion" />
          </div>
          <div className="card-body text-white">
            <h5 className="card-title fw-bold mb-1">{name}</h5>
            <p className="text-secondary mb-0">
              <small>{role}</small>
            </p>
          </div>
        </div>

        <div className="team-flip-card__back card bg-soft-dark border-0 shadow-sm text-center h-100">
          <div className="card-body text-white d-flex flex-column align-items-center justify-content-center gap-3">
            <i className="bi bi-github display-5 text-secondary"></i>
            <h5 className="fw-bold mb-0">{name}</h5>
            <a
              href={github}
              className="btn btn-outline-secondary rounded-pill px-4"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUtenti;
