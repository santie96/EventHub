import { Link } from "react-router-dom";

const iconeCategorie = {
  Musica: "bi-music-note-beamed",
  Sport: "bi-trophy",
  Tecnologia: "bi-cpu",
  "Cultura e Spettacolo": "bi-bank",
  Enogastronomia: "bi-cup-hot",
};

function bottoneCategoriaColore(categoria) {
  switch (categoria) {
    case "Musica":
      return "btn-outline-primary";
    case "Cultura e Spettacolo":
      return "btn-outline-warning";
    case "Sport":
      return "btn-outline-success";
    case "Tecnologia":
      return "btn-outline-info";
    default:
      return "btn-outline-secondary";
  }
}

function ListCategories({ categorie }) {
  return (
    <div className="row row-cols-5 justify-content-center flex-nowrap g-2 mt-4">
      {categorie.map((cat) => (
        <div key={cat} className="col">
          <Link
            to={`/eventi?category=${encodeURIComponent(cat)}`}
            className="d-flex flex-column align-items-center text-decoration-none"
            title={cat}
          >
            <span className="d-block mx-auto" style={{ width: "86px", height: "86px" }}>
              <span
                className={`btn rounded-3 w-100 h-100 d-flex align-items-center justify-content-center ${bottoneCategoriaColore(cat)}`}
              >
                <i className={`bi ${iconeCategorie[cat] || "bi-grid-fill"} fs-3`}></i>
              </span>
            </span>
            <span className="small lh-sm text-center text-light mt-2">{cat}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ListCategories;
