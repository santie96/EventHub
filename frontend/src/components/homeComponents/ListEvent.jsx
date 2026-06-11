import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardListEvent from "./CardListEvent";
import { eventsAPI } from "../../services/api";

function ListEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calcoliamo quanti item mostrare in base alla larghezza
  const [itemsToShow, setItemsToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setItemsToShow(5);
      else if (window.innerWidth >= 992) setItemsToShow(4);
      else if (window.innerWidth >= 768) setItemsToShow(3);
      else if (window.innerWidth >= 576) setItemsToShow(2);
      else setItemsToShow(1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsAPI.getAll();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error("Errore nel caricamento degli eventi:", err);
        setError("Impossibile caricare gli eventi. Riprova più tardi.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Il numero totale di item è events.length + 1 (la card "Vedi tutti")
  // Prendiamo fino a 8 eventi come richiesto
  const eventiSlider = events.slice(0, 8);

  const totalItems = eventiSlider.length + 1;

  const nextSlide = () => {
    if (currentIndex < totalItems - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="py-5 overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 text-light mb-0">Eventi in evidenza</h2>

          {!loading && totalItems > itemsToShow && (
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary btn-sm rounded-circle"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="btn btn-outline-secondary btn-sm rounded-circle"
                onClick={nextSlide}
                disabled={currentIndex >= totalItems - itemsToShow}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : eventiSlider.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Nessun evento disponibile al momento.</p>
          </div>
        ) : (
          <div className="slider-container">
            <div
              className="slider-track py-3"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {eventiSlider.map((event) => (
                <div key={event.id} className="slider-item">
                  <CardListEvent event={event} />
                </div>
              ))}

              {/* Card "Vedi tutti" */}
              <div className="slider-item">
                <div className="h-100 px-2">
                  <Link
                    to="/eventi"
                    className="text-decoration-none h-100 d-block"
                  >
                    <article className="card bg-primary animazione-card-x border-0 shadow-sm h-100 d-flex align-items-center justify-content-center text-center p-3">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center text-white p-0">
                        <div
                          className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3 transition-all"
                          style={{ width: '60px', height: '60px' }}
                        >
                          <i className="bi bi-arrow-right fs-3"></i>
                        </div>
                        <h6 className="fw-bold mb-0">Scopri tutti<br />gli eventi</h6>
                      </div>
                    </article>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ListEvent;
