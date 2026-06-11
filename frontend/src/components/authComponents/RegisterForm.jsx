// Form di registrazione con dati utente e scelta ruolo.
// Usa AuthContext per stato, errori e invio della registrazione.
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RegisterForm() {
  const {
    registerForm,
    registerErrore,
    registerCaricamento,
    cambiaRegisterForm,
    inviaRegistrazione,
  } = useAuth();

  return (
    <div
      className="card shadow-sm p-4 mx-auto border-0"
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <div className="text-center mb-4">
        <h2 className="h4 mb-2 fw-bold">Crea account</h2>
        <p>Unisciti alla nostra community di eventi</p>
      </div>

      {registerErrore && (
        <div className="alert alert-danger" role="alert">
          <span>Attenzione:</span> {registerErrore}
        </div>
      )}

      <form onSubmit={inviaRegistrazione}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label fw-medium">
              Nome
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={registerForm.name}
              onChange={cambiaRegisterForm}
              placeholder="Mario"
              className="form-control"
              maxLength={255}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="surname" className="form-label fw-medium">
              Cognome
            </label>
            <input
              id="surname"
              type="text"
              name="surname"
              value={registerForm.surname}
              onChange={cambiaRegisterForm}
              placeholder="Rossi"
              className="form-control"
              maxLength={255}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={registerForm.username}
            onChange={cambiaRegisterForm}
            placeholder="mario88"
            className="form-control"
            minLength={3}
            maxLength={255}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={registerForm.email}
            onChange={cambiaRegisterForm}
            placeholder="mario.rossi@esempio.it"
            className="form-control"
            maxLength={255}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label fw-medium">
            Vuoi organizzare o partecipare?
          </label>
          <select
            id="role"
            name="role"
            value={registerForm.role}
            onChange={cambiaRegisterForm}
            className="form-select"
          >
            <option value="partecipant">Voglio partecipare agli eventi</option>
            <option value="organizer">Voglio organizzare eventi</option>
          </select>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label fw-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={registerForm.password}
              onChange={cambiaRegisterForm}
              placeholder="********"
              className="form-control"
              minLength={8}
              maxLength={100}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':&quot;\\|,.<>\/?`~]).+$"
              title="La password deve contenere almeno una maiuscola, una minuscola, un numero e un carattere speciale"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-medium">
              Conferma
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={registerForm.confirmPassword}
              onChange={cambiaRegisterForm}
              placeholder="********"
              className="form-control"
              minLength={8}
              maxLength={100}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-secondary w-100 py-2 mt-2 fw-bold"
          disabled={registerCaricamento}
        >
          {registerCaricamento ? "Registrazione in corso..." : "Crea account"}
        </button>
      </form>

      <p className="text-center mt-4 mb-0">
        Hai gia un account?{" "}
        <Link to="/login" className="text-decoration-none text-secondary fw-bold">
          Accedi
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
