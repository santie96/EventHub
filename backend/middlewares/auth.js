const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const eventsModel = require('../models/eventsModel');
const registrationsModel = require('../models/registrationsModel');

const autenticato = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ successo: false, errore: 'Token mancante' });
  }

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const result = await usersModel.findById(payload.id);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ successo: false, errore: 'Utente non trovato' });
    }

    if (user.token_version !== payload.token_version) {
      return res.status(401).json({
        successo: false,
        errore: 'Token non piu valido, effettua nuovamente il login'
      });
    }

    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ successo: false, errore: 'Token non valido o scaduto' });
  }
};

// GET /api/users
// GET /api/registrations
const soloAdmin = (req, res, next) => {
  const isAdmin = req.user?.role === 'admin';

  if (!isAdmin) {
    return res.status(403).json({
      successo: false,
      errore: 'Accesso consentito solo agli admin'
    });
  }

  next();
};

// GET /api/users/:id
// PATCH /api/users/:id
// GET /api/registrations/user/:id
const soloAdminOStessoUtente = (req, res, next) => {
  const idRichiesto = parseInt(req.params.id);
  const isAdmin = req.user?.role === 'admin';
  const isStessoUtente = req.user?.id === idRichiesto;

  if (!isAdmin && !isStessoUtente) {
    return res.status(403).json({
      successo: false,
      errore: 'Puoi accedere solo ai tuoi dati'
    });
  }

  next();
};

// POST /api/events
const soloAdminOOrganizer = (req, res, next) => {
  const isAdmin = req.user?.role === 'admin';
  const isOrganizer = req.user?.role === 'organizer';

  if (!isAdmin && !isOrganizer) {
    return res.status(403).json({
      successo: false,
      errore: 'Accesso consentito solo ad admin o organizer'
    });
  }

  next();
};

// POST /api/registrations
// Se vuoi permettere anche agli admin di iscrivere utenti, aggiungi isAdmin.
const soloPartecipant = (req, res, next) => {
  const isPartecipant = req.user?.role === 'partecipant';

  if (!isPartecipant) {
    return res.status(403).json({
      successo: false,
      errore: 'Accesso consentito solo ai partecipanti'
    });
  }

  next();
};

// PATCH /api/events/:id
// DELETE /api/events/:id
// GET /api/registrations/event/:id
const soloAdminOOrganizerProprietarioEvento = async (req, res, next) => {
  const eventId = parseInt(req.params.id);
  const isAdmin = req.user?.role === 'admin';

  try {
    const result = await eventsModel.findById(eventId);
    const event = result.rows[0];

    if (!event) {
      return res.status(404).json({ successo: false, errore: 'Evento non trovato' });
    }

    const isOrganizerProprietario =
      req.user?.role === 'organizer' && event.organizer_id === req.user?.id;

    if (!isAdmin && !isOrganizerProprietario) {
      return res.status(403).json({
        successo: false,
        errore: 'Puoi gestire solo gli eventi creati da te'
      });
    }

    // Utile se poi controller/service vogliono riusare l'evento gia cercato.
    req.event = event;
    next();
  } catch (err) {
    next(err);
  }
};

// GET /api/registrations/:id
// DELETE /api/registrations/:id
const soloAdminOProprietarioRegistrazione = async (req, res, next) => {
  const registrationId = parseInt(req.params.id);
  const isAdmin = req.user?.role === 'admin';

  try {
    const result = await registrationsModel.findById(registrationId);
    const registration = result.rows[0];

    if (!registration) {
      return res.status(404).json({ successo: false, errore: 'Registrazione non trovata' });
    }

    const isProprietarioRegistrazione = registration.user_id === req.user?.id;

    if (!isAdmin && !isProprietarioRegistrazione) {
      return res.status(403).json({
        successo: false,
        errore: 'Puoi gestire solo le tue registrazioni'
      });
    }

    // Utile se poi controller/service vogliono riusare la registrazione gia cercata.
    req.registration = registration;
    next();
  } catch (err) {
    next(err);
  }
};

// DELETE /api/registrations/:id
const soloPartecipantProprietarioRegistrazione = async (req, res, next) => {
  const registrationId = parseInt(req.params.id);

  try {
    const result = await registrationsModel.findById(registrationId);
    const registration = result.rows[0];

    if (!registration) {
      return res.status(404).json({ successo: false, errore: 'Registrazione non trovata' });
    }

    const isPartecipant = req.user?.role === 'partecipant';
    const isProprietarioRegistrazione = registration.user_id === req.user?.id;

    if (!isPartecipant || !isProprietarioRegistrazione) {
      return res.status(403).json({
        successo: false,
        errore: 'Puoi cancellare solo le tue registrazioni da partecipante'
      });
    }

    req.registration = registration;
    next();
  } catch (err) {
    next(err);
  }
};

// DELETE /api/registrations/:id
const soloPartecipantProprietarioRegistrazioneOOrganizerEvento = async (req, res, next) => {
  const registrationId = parseInt(req.params.id);

  try {
    const result = await registrationsModel.findById(registrationId);
    const registration = result.rows[0];

    if (!registration) {
      return res.status(404).json({ successo: false, errore: 'Registrazione non trovata' });
    }

    const isPartecipant = req.user?.role === 'partecipant';
    const isProprietarioRegistrazione = registration.user_id === req.user?.id;
    const isOrganizerEvento =
      req.user?.role === 'organizer' && registration.event_organizer === req.user?.id;

    if ((!isPartecipant || !isProprietarioRegistrazione) && !isOrganizerEvento) {
      return res.status(403).json({
        successo: false,
        errore: 'Puoi cancellare solo le tue registrazioni o quelle dei tuoi eventi'
      });
    }

    req.registration = registration;
    next();
  } catch (err) {
    next(err);
  }
};

// Variante piu permissiva:
// admin, proprietario della registrazione, oppure organizer proprietario dell'evento.
// Potrebbe servire se vuoi permettere a un organizer di vedere una singola iscrizione
// relativa a un suo evento.
const soloAdminOProprietarioRegistrazioneOOrganizerEvento = async (req, res, next) => {
  const registrationId = parseInt(req.params.id);
  const isAdmin = req.user?.role === 'admin';

  try {
    const result = await registrationsModel.findById(registrationId);
    const registration = result.rows[0];

    if (!registration) {
      return res.status(404).json({ successo: false, errore: 'Registrazione non trovata' });
    }

    const isProprietarioRegistrazione = registration.user_id === req.user?.id;
    const isOrganizerEvento =
      req.user?.role === 'organizer' && registration.event_organizer === req.user?.id;

    if (!isAdmin && !isProprietarioRegistrazione && !isOrganizerEvento) {
      return res.status(403).json({
        successo: false,
        errore: 'Non sei autorizzato ad accedere a questa registrazione'
      });
    }

    req.registration = registration;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  autenticato,
  soloAdmin,
  soloAdminOStessoUtente,
  soloAdminOOrganizer,
  soloPartecipant,
  soloAdminOOrganizerProprietarioEvento,
  soloAdminOProprietarioRegistrazione,
  soloPartecipantProprietarioRegistrazione,
  soloPartecipantProprietarioRegistrazioneOOrganizerEvento,
  soloAdminOProprietarioRegistrazioneOOrganizerEvento
};
