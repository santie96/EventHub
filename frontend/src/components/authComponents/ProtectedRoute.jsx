// Protegge le pagine che richiedono un utente autenticato.
// Se manca il token/utente rimanda alla pagina di login.
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { utente } = useAuth();

  if (!utente) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
