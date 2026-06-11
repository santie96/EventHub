const eventsService = require('../services/eventsServices');

// POST /
const crea = async (req, res, next) => {
  try {
    const event = await eventsService.crea(req.user.id, req.body);
    res.status(201).json({ successo: true, dati: event });
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => {
  try {
    const events = await eventsService.getAll();
    res.json({ successo: true, dati: events });
  } catch (err) { next(err); }
};

// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const event = await eventsService.getById(id);
    res.json({ successo: true, dati: event });
  } catch (err) { next(err); }
};


// GET /category/:category
const getAllByCategory = async (req, res, next) => {
  try {
    const event = await eventsService.getAllByCategory(req.params.category);
    res.json({ successo: true, dati: event });
  } catch (err) { next(err); }
};

// GET /organizer/:id
const getAllByOrganizerId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const event = await eventsService.getAllByOrganizerId(id);
    res.json({ successo: true, dati: event });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const event = await eventsService.aggiorna(id, req.body);
    res.json({ successo: true, dati: event });
  } catch (err) { next(err); }
};

// PATCH /:id/image
const aggiornaImmagine = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (!req.imageUrl) {
      const err = new Error('Immagine evento obbligatoria');
      err.statusCode = 400;
      throw err;
    }

    const vecchioEvento = await eventsService.getById(id);
    const event = await eventsService.aggiorna(id, { image: req.imageUrl });

    if (vecchioEvento.image !== req.imageUrl) {
      eventsService.eliminaImmagineEvento(vecchioEvento.image);
    }

    res.json({ successo: true, dati: event });
  } catch (err) { next(err); }
};

// DELETE /:id 
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await eventsService.elimina(id);
    res.json({ successo: true });
  } catch (err) { next(err); }
};

module.exports = { crea, getAll, getById, getAllByCategory, getAllByOrganizerId, aggiorna, aggiornaImmagine, elimina };
