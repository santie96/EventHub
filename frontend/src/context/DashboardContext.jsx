import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useAuth } from "./AuthContext";

const DashboardContext = createContext(null);

function getRoleBadge(role) {
  const roles = {
    partecipant: { label: "Utente", cls: "bg-primary" },
    organizer: { label: "Organizzatore", cls: "bg-success" },
    admin: { label: "Admin", cls: "bg-danger" },
  };

  return roles[role] || roles.partecipant;
}

export function DashboardProvider({ children }) {
  const navigate = useNavigate();
  const { utente, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("dashboardTab") || "profilo",
  );

  const user = {
    name: utente?.name
      ? `${utente.name} ${utente.surname || ""}`.trim()
      : "Utente",
    email: utente?.email || "",
    role: utente?.role || "partecipant",
    avatar: utente?.img_profile || null,
  };

  const roleBadge = getRoleBadge(user.role);

  useEffect(() => {
    if (
      activeTab === "registrazioni" &&
      user.role !== "admin" &&
      user.role !== "organizer"
    ) {
      setActiveTab("profilo");
      localStorage.setItem("dashboardTab", "profilo");
      return;
    }

    localStorage.setItem("dashboardTab", activeTab);
  }, [activeTab, user.role]);

  const cambiaTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("dashboardTab", tab);
  };

  const tornaAlSito = () => {
    navigate("/");
  };

  const esciDashboard = () => {
    localStorage.removeItem("dashboardTab");
    logout();
    navigate("/login");
  };

  return (
    <DashboardContext.Provider
      value={{
        logo,
        user,
        roleBadge,
        activeTab,
        cambiaTab,
        tornaAlSito,
        esciDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(DashboardContext);
}
