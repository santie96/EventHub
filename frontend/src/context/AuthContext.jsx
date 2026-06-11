import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authAPI, usersAPI } from "../services/api";

const AuthContext = createContext(null);

const initialLoginForm = { email: "", password: "" };

const initialRegisterForm = {
  name: "",
  surname: "",
  username: "",
  email: "",
  role: "partecipant",
  password: "",
  confirmPassword: "",
};

function decodeJWT(token) {
  try {
    // Sostituiamo i caratteri Base64Url → Base64 standard
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

// ── Provider ──────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [utente, setUtente] = useState(() => {
    const t = localStorage.getItem("token");
    return t ? decodeJWT(t) : null;
  });

  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [loginErrore, setLoginErrore] = useState(null);
  const [registerErrore, setRegisterErrore] = useState(null);
  const [loginCaricamento, setLoginCaricamento] = useState(false);
  const [registerCaricamento, setRegisterCaricamento] = useState(false);

  const login = (nuovoToken) => {
    localStorage.setItem("token", nuovoToken);
    setToken(nuovoToken);
    setUtente(decodeJWT(nuovoToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUtente(null);
  };

  useEffect(() => {
    if (!token) {
      setUtente(null);
      return;
    }

    const payload = decodeJWT(token);

    if (!payload || payload.exp * 1000 < Date.now()) {
      logout();
      return;
    }

    setUtente(payload);

    if (!payload.id) {
      return;
    }

    let annullato = false;

    const caricaUtente = async () => {
      try {
        const datiUtente = await usersAPI.getById(payload.id);

        if (!annullato) {
          setUtente((prev) => ({ ...prev, ...datiUtente }));
        }
      } catch {
        // Gli errori 401 vengono già gestiti globalmente da auth:unauthorized.
      }
    };

    caricaUtente();

    return () => {
      annullato = true;
    };
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const cambiaLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const cambiaRegisterForm = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const inviaLogin = async (e) => {
    e.preventDefault();
    setLoginErrore(null);
    setLoginCaricamento(true);

    const destinazione = location.state?.from?.pathname || "/";

    try {
      const nuovoToken = await authAPI.login(
        loginForm.email,
        loginForm.password,
      );
      login(nuovoToken);
      setLoginForm(initialLoginForm);
      navigate(destinazione, { replace: true });
    } catch (err) {
      setLoginErrore(err.message || "Credenziali non valide");
    } finally {
      setLoginCaricamento(false);
    }
  };

  const inviaRegistrazione = async (e) => {
    e.preventDefault();
    setRegisterErrore(null);
    setRegisterCaricamento(true);

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterErrore("Le password non coincidono.");
      setRegisterCaricamento(false);
      return;
    }

    const datiRegistrazione = {
      name: registerForm.name,
      surname: registerForm.surname,
      username: registerForm.username,
      email: registerForm.email,
      role: registerForm.role,
      password_hash: registerForm.password,
    };

    try {
      await authAPI.registra(datiRegistrazione);

      const nuovoToken = await authAPI.login(
        registerForm.email,
        registerForm.password,
      );
      login(nuovoToken);
      setRegisterForm(initialRegisterForm);
      navigate("/", { replace: true });
    } catch (err) {
      setRegisterErrore(err.message || "Errore durante la registrazione");
    } finally {
      setRegisterCaricamento(false);
    }
  };

  // Aggiorna i dati utente nel contesto (dopo modifica profilo)
  const aggiornaUtente = (nuoviDati) => {
    if (nuoviDati?.token) {
      localStorage.setItem("token", nuoviDati.token);
      setToken(nuoviDati.token);
      setUtente(decodeJWT(nuoviDati.token));
      return;
    }

    setUtente((prev) => ({ ...prev, ...nuoviDati }));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        utente,
        login,
        logout,
        aggiornaUtente,
        loginForm,
        loginErrore,
        loginCaricamento,
        cambiaLoginForm,
        inviaLogin,
        registerForm,
        registerErrore,
        registerCaricamento,
        cambiaRegisterForm,
        inviaRegistrazione,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
