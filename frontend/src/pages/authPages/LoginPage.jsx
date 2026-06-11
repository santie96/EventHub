import LoginForm from "../../components/authComponents/LoginForm";
import useSEO from "../../hooks/useSEO";

function LoginPage() {
  useSEO({
    title: "Accedi",
    description: "Accedi al tuo account EventHub per gestire e partecipare agli eventi."
  });

  return (
    <div className="auth-container d-flex justify-content-center align-items-center flex-grow-1 py-5">
      <LoginForm />
    </div>
  );
}

export default LoginPage;