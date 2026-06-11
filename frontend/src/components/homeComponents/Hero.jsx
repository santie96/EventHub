// Sezione hero della homepage con titolo e barra di ricerca.
// Delega tutta la logica della ricerca al componente HeroSearchForm.
import { useState, useEffect } from "react";
import HeroSearchForm from "./heroComponents/HeroSearchForm";
import ListCategories from "./ListCategories";
import { SearchProvider } from "../../context/SearchContext";
import { eventsAPI } from "../../services/api";
import logo from "../../assets/img/logo.png";
function Hero() {
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getAll();
        const categorieEventi = [...new Set(data.map((evento) => evento.category))]
          .filter(Boolean)
          .sort();

        setCategorie(categorieEventi);
      } catch (err) {
        console.error("Errore nel caricamento delle categorie:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="hero-section text-center py-5 d-flex align-items-center justify-content-center flex-column gap-3">
      <img src={logo} alt="EventiHub" className="hero-logo" />

      <h1 className="display-3 fw-bold text-light mb-2 mt-5">
        Vivi momenti <br /> che restano.
      </h1>

      <div className="container pb-4">
        <p className="lead text-light fw-semibold mb-5 py-4">
          Eventi pubblici o privati per ogni interesse. <br /> Crea, organizza e
          partecipa.
        </p>

        <SearchProvider>
          <HeroSearchForm />
        </SearchProvider>

        {categorie.length > 0 && (
          <div className="d-flex flex-column gap-3 mt-5 pt-5">
            <span className="h3">Scopri le nostre categorie</span>
            <ListCategories categorie={categorie} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
