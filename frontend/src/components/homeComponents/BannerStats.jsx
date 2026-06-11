function BannerStats() {
    return (
        <section className="py-4">
            <div className="container">
                <div className="card bg-soft-dark border-0 shadow-sm rounded-4">
                    <div className="card-body py-4 px-3">
                        <div className="row g-4 justify-content-center align-items-center">
                            
                            {/* Stat 1 */}
                            <div className="col-6 col-lg-3">
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                                        <i className="bi bi-calendar2-event text-primary fs-4"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span className="h5 fw-bold m-0 text-white">100K+</span>
                                        <p className="x-small text-secondary m-0">Eventi mensili</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div className="col-6 col-lg-3">
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                                        <i className="bi bi-people-fill text-primary fs-4"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span className="h5 fw-bold m-0 text-white">1B+</span>
                                        <p className="x-small text-secondary m-0">Utenti attivi</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat 3 */}
                            <div className="col-6 col-lg-3">
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                                        <i className="bi bi-heart-fill text-primary fs-4"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span className="h5 fw-bold m-0 text-white">98%</span>
                                        <p className="x-small text-secondary m-0">Soddisfazione</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat 4 */}
                            <div className="col-6 col-lg-3">
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                                        <i className="bi bi-chat-left-dots-fill text-primary fs-4"></i>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span className="h5 fw-bold m-0 text-white">24/7</span>
                                        <p className="x-small text-secondary m-0">Assistenza</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerStats;