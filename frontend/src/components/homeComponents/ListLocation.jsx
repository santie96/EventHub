import { useState, useEffect } from "react";
import CardListLocation from "./CardListLocation";
import { eventsAPI } from "../../services/api";
import Roma from "../../assets/img/Citta/Roma.webp";
import Napoli from "../../assets/img/Citta/Napoli.webp";
import Milano from "../../assets/img/Citta/Milano.webp";
import Ancona from "../../assets/img/Citta/Ancona.webp";
import Firenze from "../../assets/img/Citta/Firenze.webp";


const imgLocations = {
    Roma,
    Napoli,
    Milano,
    Ancona,
    Firenze,
};


function ListLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Calcoliamo quanti item mostrare in base alla larghezza
    const [itemsToShow, setItemsToShow] = useState(5);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventsAPI.getAll();
                const locationsEventi = [...new Set(data.map((evento) => evento.location))]
                    .filter(Boolean)
                    .sort();

                setLocations(locationsEventi.map((location, index) => ({
                    id: index + 1,
                    nome: location,
                    img: imgLocations[location],
                })));
            } catch (err) {
                console.error("Errore nel caricamento delle locations:", err);
                setError("Impossibile caricare le locations. Riprova più tardi.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

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

    const totalItems = locations.length;

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
                    <h2 className="h4 text-light mb-0">Le nostre locations</h2>

                    {totalItems > itemsToShow && (
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
                ) : locations.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-muted">Nessuna categoria disponibile al momento.</p>
                    </div>
                ) : (
                    <div className="slider-container">
                        <div
                            className="slider-track py-3"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                            }}
                        >
                            {locations.map((location) => (
                                <div key={location.id} className="slider-item">
                                    <CardListLocation location={location} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ListLocations;
