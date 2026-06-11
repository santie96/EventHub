import { createContext, useContext, useState } from "react";
import profilePlaceholder from "../assets/img/profile_placeholder.webp";
import { usersAPI } from "../services/api";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null);

function getRoleBadge(role) {
  const roles = {
    partecipant: { label: "Utente", cls: "bg-primary", icon: "bi-person-fill" },
    organizer: {
      label: "Organizzatore",
      cls: "bg-success",
      icon: "bi-calendar-star",
    },
    admin: { label: "Admin", cls: "bg-danger", icon: "bi-shield-lock-fill" },
  };

  return roles[role] || roles.partecipant;
}

export function ProfileProvider({ children }) {
  const { utente, aggiornaUtente } = useAuth();
  const [mostraModale, setMostraModale] = useState(false);
  const [mostraModaleElimina, setMostraModaleElimina] = useState(false);
  const [form, setForm] = useState({});
  const [fotoProfilo, setFotoProfilo] = useState(null);
  const [anteprimaFoto, setAnteprimaFoto] = useState(null);
  const [toast, setToast] = useState(null);
  const [erroreForm, setErroreForm] = useState(null);
  const [erroreElimina, setErroreElimina] = useState(null);
  const [caricamento, setCaricamento] = useState(false);
  const [caricamentoElimina, setCaricamentoElimina] = useState(false);

  if (!utente) return null;

  const roleBadge = getRoleBadge(utente.role);
  const nomeCompleto = [utente.name, utente.surname].filter(Boolean).join(" ");
  const immagineProfilo = utente.img_profile || profilePlaceholder;
  const nomeFotoProfilo = fotoProfilo?.name || "nessuna foto selezionata";

  const campi = [
    { label: "Nome", valore: utente.name || "-", icona: "bi-person" },
    { label: "Cognome", valore: utente.surname || "-", icona: "bi-person" },
    { label: "Username", valore: utente.username || "-", icona: "bi-at" },
    { label: "Email", valore: utente.email || "-", icona: "bi-envelope" },
    { label: "Localita", valore: utente.location || "-", icona: "bi-geo-alt" },
    { label: "Indirizzo", valore: utente.indirizzo || "-", icona: "bi-house" },
  ];

  const mostraToast = (messaggio, tipo = "success") => {
    setToast({ messaggio, tipo });
    setTimeout(() => setToast(null), 3500);
  };

  const apriModale = () => {
    setForm({
      name: utente.name || "",
      surname: utente.surname || "",
      username: utente.username || "",
      email: utente.email || "",
      location: utente.location || "",
      indirizzo: utente.indirizzo || "",
      password: "",
      confermaPassword: "",
    });
    setFotoProfilo(null);
    setAnteprimaFoto(immagineProfilo);
    setToast(null);
    setErroreForm(null);
    setMostraModale(true);
  };

  const chiudiModale = () => {
    setMostraModale(false);
    setFotoProfilo(null);
    setAnteprimaFoto(null);
    setErroreForm(null);
  };

  const apriModaleElimina = () => {
    setErroreElimina(null);
    setMostraModaleElimina(true);
  };

  const chiudiModaleElimina = () => {
    setMostraModaleElimina(false);
    setErroreElimina(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFotoProfilo(file);
    setAnteprimaFoto(file ? URL.createObjectURL(file) : immagineProfilo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setErroreForm(null);

    if (form.password || form.confermaPassword) {
      if (form.password !== form.confermaPassword) {
        setErroreForm("Le password non coincidono.");
        return;
      }
      if (form.password.length < 8) {
        setErroreForm("La password deve essere di almeno 8 caratteri.");
        return;
      }
    }

    setCaricamento(true);

    try {
      const dati = {
        name: form.name,
        surname: form.surname,
        username: form.username,
        email: form.email,
        location: form.location,
        indirizzo: form.indirizzo,
      };

      if (form.password) dati.password_hash = form.password;

      const risposta = await usersAPI.aggiorna(utente.id, dati);
      const rispostaFoto = fotoProfilo
        ? await usersAPI.aggiornaImmagineProfilo(utente.id, fotoProfilo)
        : null;

      aggiornaUtente(rispostaFoto || risposta || dati);
      chiudiModale();
      mostraToast("Profilo aggiornato con successo!");
    } catch (err) {
      setErroreForm(
        err.message || "Errore durante l'aggiornamento del profilo.",
      );
    } finally {
      setCaricamento(false);
    }
  };

  const handleEliminaProfilo = async () => {
    setErroreElimina(null);
    setCaricamentoElimina(true);

    try {
      await usersAPI.elimina(utente.id);
      localStorage.removeItem("dashboardTab");
      window.dispatchEvent(new Event("auth:unauthorized"));
    } catch (err) {
      setErroreElimina(
        err.message || "Errore durante l'eliminazione del profilo.",
      );
    } finally {
      setCaricamentoElimina(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        campi,
        nomeCompleto,
        immagineProfilo,
        roleBadge,
        mostraModale,
        mostraModaleElimina,
        form,
        anteprimaFoto: anteprimaFoto || immagineProfilo,
        nomeFotoProfilo,
        toast,
        erroreForm,
        erroreElimina,
        caricamento,
        caricamentoElimina,
        apriModale,
        chiudiModale,
        apriModaleElimina,
        chiudiModaleElimina,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEliminaProfilo,
        chiudiToast: () => setToast(null),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}
