const registrationsService = require('../services/registrationsServices');

// POST /
const crea = async (req, res, next) => {
  try {
    const user_id = parseInt(req.user.id)
    const registration = await registrationsService.crea(req.body, user_id);
    res.status(201).json({ successo: true, dati: registration });
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => {
  try {
    const registrations = await registrationsService.getAll();
    res.json({ successo: true, dati: registrations });
  } catch (err) { next(err); }
};

// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const registration = await registrationsService.getById(id);
    res.json({ successo: true, dati: registration });
  } catch (err) { next(err); }
};

// GET /event/:id
const getAllByEventId = async (req, res, next) => {
    try {
    const id = parseInt(req.params.id);
    const registrations = await registrationsService.getAllByEventId(id);
    res.json({ successo: true, dati: registrations });
  } catch (err) { next(err); }
};

// GET /event/:id/public
const getPublicByEventId = async (req, res, next) => {
    try {
    const id = parseInt(req.params.id);
    const registrations = await registrationsService.getPublicByEventId(id);
    res.json({ successo: true, dati: registrations });
  } catch (err) { next(err); }
};


// GET /user/:id
const getAllByUserId = async (req, res, next) => {
    try {
    const id = parseInt(req.params.id);
    const registrations = await registrationsService.getAllByUserId(id);
    res.json({ successo: true, dati: registrations });
  } catch (err) { next(err); }
};


// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await registrationsService.elimina(id);
    res.json({ successo: true });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, getAllByEventId, getAllByUserId, getPublicByEventId, crea, elimina};
