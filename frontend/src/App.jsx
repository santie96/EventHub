import { Routes, Route } from "react-router-dom";
import Layout from "./components/layoutComponents/Layout";

import HomePage from "./pages/publicPages/HomePage";
import ContattiPage from "./pages/publicPages/ContattiPage";
import ChiSiamoPage from "./pages/publicPages/ChiSiamoPage";
import EventiPage from "./pages/eventsPages/EventiPage";
import Dashboard from "./pages/dashboardPages/Dashboard";
import ProtectedRoute from "./components/authComponents/ProtectedRoute";

import LoginPage from "./pages/authPages/LoginPage";
import RegisterPage from "./pages/authPages/RegisterPage";
import EventiDettaglioPage from "./pages/eventsPages/EventiDettaglioPage";
import NotFound from "./pages/errorPages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="chi-siamo" element={<ChiSiamoPage />} />
          <Route path="eventi" element={<EventiPage />} />
           <Route path="/eventi/:id" element={<EventiDettaglioPage />} />
          <Route path="contatti" element={<ContattiPage />} />

        </Route>

       
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
