// Lista responsive degli eventi organizzatore sotto desktop.
// Una sola card cambia layout con la griglia Bootstrap tra mobile e tablet.
import { Link } from "react-router-dom";
import {
  EventActionButtons,
  EventPriceBadge,
  EventSeatsBadges,
  EventTitleCell,
} from "./OrganizerEventParts";
import {
  OrganizerEventProvider,
  useOrganizerEventsContext,
} from "../../../context/OrganizerEventsContext.jsx";

function OrganizerEventsList() {
  const { eventi } = useOrganizerEventsContext();

  return (
    <div className="d-xl-none row g-3">
      {eventi.map((evento) => (
        <OrganizerEventProvider key={evento.id} evento={evento}>
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <div className="row g-3 align-items-start align-items-md-center">
                  <div className="col-10 col-md-5">
                    <EventTitleCell heading />
                  </div>
                  <div className="col-2 d-md-none text-end">
                    <Link
                      to={`/eventi/${evento.id}`}
                      className="btn btn-sm btn-light text-primary rounded-pill shadow-sm"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                  </div>
                  <div className="col-12 col-md-3 small">
                    <i className="bi bi-calendar3 text-primary me-2"></i>
                    {new Date(evento.date).toLocaleDateString("it-IT")}
                  </div>
                  <div className="col-12 col-md-4 small">
                    <i className="bi bi-geo-alt text-danger me-2"></i>
                    <span className="fw-semibold text-dark">
                      {evento.location}
                    </span>
                    <span className="d-md-none"> - </span>
                    <br className="d-none d-md-block" />
                    <span className="ms-md-4">{evento.indirizzo || "-"}</span>
                  </div>
                </div>

                <div className="row g-3 align-items-center pt-3 mt-3 border-top">
                  <div className="col-12 col-md-2">
                    <EventPriceBadge />
                  </div>
                  <div className="col-12 col-md-6">
                    <EventSeatsBadges />
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="d-md-none">
                      <EventActionButtons mobile />
                    </div>
                    <div className="d-none d-md-block">
                      <EventActionButtons />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OrganizerEventProvider>
      ))}
    </div>
  );
}

export default OrganizerEventsList;
