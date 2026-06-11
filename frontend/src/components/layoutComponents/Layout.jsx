// Layout base delle pagine pubbliche con navbar, contenuto e footer.
// Usa Outlet per renderizzare la pagina figlia della route.
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
// import { useAuth } from "../context/useAuth";   // servirà più avanti

function Layout() {
  // const { user, logout } = useAuth();
  //   togliere commento quando si implementa il contesto

  return (
    <div className="layout d-flex flex-column min-vh-100">
      <Navbar />

      <main className="bg-dark flex-grow-1 d-flex flex-column">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
