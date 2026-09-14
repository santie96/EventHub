# EventHub

> **Full-stack event management platform** for discovering, creating and managing events, registrations and users.

EventHub è una piattaforma web **full stack** sviluppata per la gestione completa degli eventi.
Gli utenti possono registrarsi, autenticarsi, esplorare e filtrare gli eventi disponibili e gestire le proprie iscrizioni, mentre gli organizzatori possono creare e amministrare i propri eventi e monitorarne i partecipanti.

L'applicazione è strutturata secondo un'architettura **Frontend / REST API / Backend / Database**, con autenticazione JWT, gestione dei ruoli e persistenza dei dati su PostgreSQL.

---

## ✨ Features

| Area                  | Funzionalità                                                          |
| --------------------- | --------------------------------------------------------------------- |
| 🔐 **Autenticazione** | Registrazione, login, JWT, logout e gestione della sessione           |
| 👤 **Profilo**        | Visualizzazione e modifica del profilo, password e immagine personale |
| 🎫 **Eventi**         | Visualizzazione, ricerca, filtri e dettaglio degli eventi             |
| ➕ **Gestione eventi** | Creazione, modifica ed eliminazione degli eventi                      |
| 📝 **Registrazioni**  | Iscrizione e cancellazione dagli eventi                               |
| 👥 **Partecipanti**   | Visualizzazione e gestione delle iscrizioni agli eventi               |
| 📊 **Dashboard**      | Dashboard dedicate alle funzionalità di gestione                      |
| 🏷️ **Categorie**     | Organizzazione e filtraggio degli eventi per categoria                |
| 📍 **Località**       | Gestione di città, indirizzi e localizzazione degli eventi            |
| 🖼️ **Upload**        | Upload delle immagini di profilo e degli eventi                       |
| 👑 **Ruoli**          | Gestione differenziata di Admin, Organizer e Participant              |
| 🛡️ **Sicurezza**     | Validazione, rate limiting, Helmet, CORS e gestione autorizzazioni    |

---

## 👥 User Roles

| Ruolo               | Descrizione                      | Permessi principali                                               |
| ------------------- | -------------------------------- | ----------------------------------------------------------------- |
| 👑 **Admin**        | Amministratore della piattaforma | Gestione e supervisione del sistema                               |
| 🎤 **Organizer**    | Organizzatore di eventi          | Creazione e gestione dei propri eventi e partecipanti             |
| 🎟️ **Participant** | Partecipante                     | Ricerca eventi, iscrizione e gestione delle proprie registrazioni |

---

## 🛠️ Tech Stack

### Frontend

| Tecnologia            | Utilizzo                              |
| --------------------- | ------------------------------------- |
| **React 19**          | Libreria principale per la UI         |
| **Vite**              | Development server e build tool       |
| **React Router 7**    | Routing dell'applicazione             |
| **Bootstrap 5**       | UI framework                          |
| **Bootstrap Icons**   | Iconografia                           |
| **Sass / SCSS**       | Gestione e organizzazione degli stili |
| **React Context API** | Gestione dello stato globale          |

### Backend

| Tecnologia             | Utilizzo                                 |
| ---------------------- | ---------------------------------------- |
| **Node.js**            | Runtime JavaScript                       |
| **Express 5**          | Framework backend                        |
| **PostgreSQL**         | Database relazionale                     |
| **pg**                 | Connessione Node.js ↔ PostgreSQL         |
| **JWT**                | Autenticazione e gestione delle sessioni |
| **bcrypt**             | Hashing delle password                   |
| **Multer**             | Gestione upload dei file                 |
| **express-validator**  | Validazione degli input                  |
| **Helmet**             | Security headers                         |
| **express-rate-limit** | Protezione dalle richieste eccessive     |
| **CORS**               | Gestione delle richieste cross-origin    |

### Development

| Strumento   | Utilizzo                    |
| ----------- | --------------------------- |
| **Git**     | Version control             |
| **GitHub**  | Repository e collaborazione |
| **Postman** | Testing delle API           |

---

## 🏗️ Architecture

EventHub utilizza un'architettura **client-server** con separazione tra presentazione, logica applicativa e persistenza dei dati.

```text
┌─────────────────────────────────────┐
│              FRONTEND               │
│                                     │
│ React + Vite                        │
│ React Router                        │
│ Context API                         │
│ Components / Pages / Hooks          │
│ Services                            │
└────────────────┬────────────────────┘
                 │
                 │ HTTP / REST API
                 ▼
┌─────────────────────────────────────┐
│               BACKEND               │
│                                     │
│ Node.js + Express                   │
│                                     │
│ Routes                              │
│ Controllers                         │
│ Middlewares                         │
│ Models                              │
│ Services / Utils                    │
└────────────────┬────────────────────┘
                 │
                 │ SQL
                 ▼
┌─────────────────────────────────────┐
│             PostgreSQL              │
│                                     │
│ users                               │
│ events                              │
│ registrations                       │
└─────────────────────────────────────┘
```

### Request Flow

Una tipica richiesta dell'applicazione segue questo flusso:

```text
User Interaction
      ↓
React Component
      ↓
Frontend Service
      ↓
REST API
      ↓
Express Route
      ↓
Middleware
      ↓
Controller
      ↓
Model
      ↓
PostgreSQL
      ↓
Response
      ↓
React State / Context
      ↓
UI Update
```

---

## 🔌 REST API

Le API sono organizzate per dominio funzionale.

| Endpoint             | Responsabilità                                               |
| -------------------- | ------------------------------------------------------------ |
| `/api/users`         | Registrazione, autenticazione e gestione utenti              |
| `/api/events`        | Creazione, modifica, eliminazione, ricerca e gestione eventi |
| `/api/registrations` | Iscrizioni e gestione dei partecipanti                       |
| `/health`            | Health check del backend                                     |

### API Domains

```text
/api
├── users
├── events
└── registrations
```

---

## 🗄️ Database

Il database PostgreSQL è organizzato attorno a tre entità principali.

| Tabella         | Responsabilità                                      |
| --------------- | --------------------------------------------------- |
| `users`         | Utenti, credenziali, profili e ruoli                |
| `events`        | Eventi, informazioni, disponibilità e organizzatori |
| `registrations` | Relazione tra utenti ed eventi                      |

### Relazioni

```text
             ┌──────────────┐
             │    USERS     │
             └──────┬───────┘
                    │
             creates│
                    ▼
             ┌──────────────┐
             │    EVENTS    │
             └──────┬───────┘
                    │
                 has│
                    ▼
             ┌──────────────┐
             │REGISTRATIONS │
             └──────┬───────┘
                    │
                    │
                    ▼
             ┌──────────────┐
             │    USERS     │
             └──────────────┘
```

La tabella `registrations` rappresenta quindi la relazione tra **utente ed evento**, permettendo di gestire le iscrizioni e il numero di posti prenotati.

Lo schema completo è disponibile in:

```text
backend/sql/schema.sql
```

---

## 🔐 Authentication & Security

La sicurezza è gestita attraverso diversi livelli.

| Meccanismo        | Tecnologia             | Scopo                                  |
| ----------------- | ---------------------- | -------------------------------------- |
| Authentication    | **JWT**                | Autenticazione degli utenti            |
| Password Security | **bcrypt**             | Hashing delle password                 |
| Authorization     | Middleware             | Controllo degli accessi                |
| Input Validation  | **express-validator**  | Validazione dei dati ricevuti          |
| HTTP Security     | **Helmet**             | Protezione degli header HTTP           |
| Rate Limiting     | **express-rate-limit** | Limitazione delle richieste            |
| CORS              | **CORS middleware**    | Controllo delle richieste cross-origin |
| File Upload       | **Multer**             | Gestione controllata degli upload      |
| Error Handling    | Custom middleware      | Gestione centralizzata degli errori    |

Il sistema utilizza inoltre una gestione della **token version**, utile per invalidare token precedentemente emessi.

---

## 🧠 Frontend State Management

La gestione dello stato globale è realizzata tramite **React Context API**.

| Context                  | Responsabilità                     |
| ------------------------ | ---------------------------------- |
| `AuthContext`            | Autenticazione e stato dell'utente |
| `EventsContext`          | Gestione degli eventi              |
| `OrganizerEventsContext` | Eventi gestiti dall'organizzatore  |
| `RegistrationsContext`   | Registrazioni e iscrizioni         |
| `ProfileContext`         | Informazioni del profilo           |
| `DashboardContext`       | Stato della dashboard              |
| `SearchContext`          | Stato della ricerca e dei filtri   |

Questa suddivisione permette di mantenere separata la gestione dello stato delle diverse aree funzionali dell'applicazione.

---

## 📁 Project Structure

```text
EventHub/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── eventsControllers.js
│   │   ├── registrationsControllers.js
│   │   └── usersControllers.js
│   │
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── buildImageUrl.js
│   │   ├── errorHandler.js
│   │   ├── seeder.js
│   │   ├── upload.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── eventsModel.js
│   │   ├── registrationsModel.js
│   │   └── usersModel.js
│   │
│   ├── postman/
│   │
│   ├── routes/
│   │   ├── eventsRoutes.js
│   │   ├── registrationsRoutes.js
│   │   └── usersRoutes.js
│   │
│   ├── services/
│   │
│   ├── sql/
│   │   └── schema.sql
│   │
│   ├── utils/
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    │
    ├── public/
    │
    └── src/
        │
        ├── assets/
        │   └── img/
        │
        ├── components/
        │   ├── authComponents/
        │   ├── dashboardComponents/
        │   ├── eventsComponents/
        │   ├── homeComponents/
        │   ├── layoutComponents/
        │   └── sharedComponents/
        │
        ├── context/
        │   ├── AuthContext.jsx
        │   ├── DashboardContext.jsx
        │   ├── EventsContext.jsx
        │   ├── OrganizerEventsContext.jsx
        │   ├── ProfileContext.jsx
        │   ├── RegistrationsContext.jsx
        │   └── SearchContext.jsx
        │
        ├── css/
        ├── hooks/
        ├── pages/
        │   ├── authPages/
        │   ├── dashboardPages/
        │   ├── errorPages/
        │   ├── eventsPages/
        │   └── publicPages/
        │
        ├── scss/
        ├── services/
        ├── App.jsx
        └── main.jsx
```

---

## ⚙️ Prerequisites

Prima di avviare il progetto è necessario avere installato:

| Software       | Versione                    |
| -------------- | --------------------------- |
| **Node.js**    | 20+                         |
| **npm**        | Incluso con Node.js         |
| **PostgreSQL** | 14+                         |
| **Git**        | Ultima versione consigliata |

---

## 🚀 Installation & Setup

### 1. Clone

```bash
git clone https://github.com/santie96/EventHub.git
cd EventHub
```

---

### 2. Database

Creare il database PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE eventhub;"
```

---

### 3. Backend

```bash
cd backend
npm install
```

Creare il file `.env`:

```bash
cp .env.example .env
```

Configurare le variabili:

```env
SERVER_PORT=3000
FRONTEND_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventhub
DB_USER=postgres
DB_PASS=postgres

ADMIN_EMAIL=admin@test.it
ADMIN_PASSWORD=Admin123
ADMIN_USERNAME=AdminUser
ADMIN_NAME=Direttore
ADMIN_SURNAME=Generale

JWT_SECRET=change_this_secret
NODE_ENV=development
```

> ⚠️ **Non utilizzare credenziali o JWT secret di esempio in produzione.**

---

### 4. Start Backend

```bash
npm start
```

Backend:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/health
```

Le tabelle del database vengono inizializzate automaticamente dal backend durante l'avvio.

---

### 5. Frontend

Aprire un nuovo terminale:

```bash
cd frontend
npm install
```

Creare il file `.env`:

```bash
cp .env.example .env
```

Configurare:

```env
VITE_API_URL=http://localhost:3000/api
```

Avviare il frontend:

```bash
npm run dev
```

Applicazione:

```text
http://localhost:5173
```

---

## 🎨 Styling

EventHub utilizza **Bootstrap 5** insieme a **Sass/SCSS**.

| Comando             | Descrizione                                            |
| ------------------- | ------------------------------------------------------ |
| `npm run build-css` | Compila gli stylesheet SCSS                            |
| `npm run watch-css` | Ricompila automaticamente gli SCSS durante lo sviluppo |

---

## 📦 Useful Commands

### Backend

```bash
npm install
npm start
```

### Frontend

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run build-css
npm run watch-css
```

---

## 🖼️ Upload Management

Il backend gestisce gli upload tramite **Multer**.

Gli upload vengono utilizzati principalmente per:

* immagini profilo;
* immagini degli eventi.

I file vengono esposti attraverso la directory statica:

```text
/uploads
```

Il middleware `buildImageUrl` permette inoltre di costruire gli URL necessari alla visualizzazione delle immagini lato frontend.

---

## 📊 Event Management Flow

Il flusso principale della gestione di un evento è:

```text
Organizer
    │
    ▼
Create Event
    │
    ▼
Frontend Form
    │
    ▼
POST /api/events
    │
    ▼
Authentication Middleware
    │
    ▼
Validation
    │
    ▼
Events Controller
    │
    ▼
Events Model
    │
    ▼
PostgreSQL
```

Per le iscrizioni:

```text
Participant
    │
    ▼
Select Event
    │
    ▼
Registration
    │
    ▼
POST /api/registrations
    │
    ▼
Validation + Authorization
    │
    ▼
Registration Model
    │
    ▼
PostgreSQL
    │
    ▼
Seats Updated
```

---

## 📌 Project Goals

Il progetto è stato sviluppato con l'obiettivo di realizzare un'applicazione full stack completa mettendo in pratica:

* sviluppo frontend con React;
* sviluppo di API REST con Node.js ed Express;
* progettazione e utilizzo di un database relazionale;
* autenticazione e autorizzazione tramite JWT;
* gestione dei ruoli;
* sviluppo di operazioni CRUD;
* gestione dello stato globale tramite Context API;
* creazione di componenti React riutilizzabili;
* gestione dei form e validazione dei dati;
* gestione degli upload;
* gestione delle iscrizioni e disponibilità dei posti;
* separazione delle responsabilità tra frontend e backend;
* gestione centralizzata degli errori e della sicurezza.

---

## 📚 Project Highlights

| Area                | Competenze dimostrate                                      |
| ------------------- | ---------------------------------------------------------- |
| **Frontend**        | React, routing, Context API, hooks, component architecture |
| **Backend**         | Node.js, Express, REST API, middleware                     |
| **Database**        | PostgreSQL, SQL, relazioni e vincoli                       |
| **Authentication**  | JWT, bcrypt, authorization                                 |
| **Security**        | Helmet, CORS, rate limiting, validation                    |
| **File Management** | Multer, image upload e static files                        |
| **Architecture**    | Frontend / API / Backend / Database                        |
| **Development**     | Git, GitHub, Postman, environment variables                |
