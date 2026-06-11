import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-vh-100 text-center pt-5">
      <h1 className="display-1 text-primary mb-0">404</h1>
      <p className="lead" style={{ marginTop: 24 }}>
        Oops! Questa pagina non esiste.
      </p>
      <Link to="/" className="btn btn-primary mt-4">
        Torna alla Home
      </Link>
    </main>
  );
}

export default NotFound;
