import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { EventsProvider } from './context/EventsContext';
import { RegistrationsProvider } from './context/RegistrationsContext';
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthProvider>
        <EventsProvider>
          <RegistrationsProvider>
            <App />
          </RegistrationsProvider>
        </EventsProvider>
      </AuthProvider>
    </BrowserRouter>
,
);
