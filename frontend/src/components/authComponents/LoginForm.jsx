// Form di login con email, password e link alla registrazione.
// Usa AuthContext per stato, errori e invio del login.
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const {
    loginForm,
    loginErrore,
    loginCaricamento,
    cambiaLoginForm,
    inviaLogin,
  } = useAuth();

  return (
    <div
      className="card shadow-sm p-4 mx-auto border-0"
      style={{ maxWidth: "400px", width: "100%" }}
    >
      <div className="text-center mb-4">
        <h2 className="h4 mb-2 fw-bold">Accedi</h2>
        <p>Inserisci le tue credenziali per continuare</p>
      </div>

      {loginErrore && (
        <div className="alert alert-danger" role="alert">
          <span>Attenzione:</span> {loginErrore}
        </div>
      )}

      <form onSubmit={inviaLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={loginForm.email}
            onChange={cambiaLoginForm}
            placeholder="mario.rossi@esempio.it"
            className="form-control"
            maxLength={255}
            required
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={loginForm.password}
            onChange={cambiaLoginForm}
            placeholder="********"
            className="form-control"
            maxLength={100}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-secondary w-100 py-2 mt-2 fw-bold"
          disabled={loginCaricamento}
        >
          {loginCaricamento ? "Accesso in corso..." : "Accedi"}
        </button>
      </form>

      <p className="text-center mt-4 mb-0">
        Non hai un account?{" "}
        <Link to="/register" className="text-decoration-none text-secondary fw-bold">
          Registrati
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
