const usersService = require('../services/usersServices');

// POST /registra
const registra = async (req, res, next) => {
  try {
    const user = await usersService.registra(req.body);
    res.status(201).json({ successo: true, dati: user });
  } catch (err) { next(err); }
};

// POST /login
const login = async (req, res, next) => {
  try {
    const token = await usersService.login(req.body);
    res.json({ successo: true, dati: token });
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json({ successo: true, dati: users });
  } catch (err) { next(err); }
};

// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await usersService.getById(id);
    res.json({ successo: true, dati: user });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await usersService.aggiorna(id, req.body);
    const isStessoUtente = req.user?.id === id;
    const token = isStessoUtente ? usersService.generaToken(user) : null;
    res.json({ successo: true, dati: token ? { user, token } : user });
  } catch (err) { next(err); }
};

// PATCH /:id/img-profile
const aggiornaImmagineProfilo = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (!req.imageUrl) {
      const err = new Error('Immagine profilo obbligatoria');
      err.statusCode = 400;
      throw err;
    }

    const vecchioUser = await usersService.getById(id);
    const user = await usersService.aggiorna(id, { img_profile: req.imageUrl });

    if (vecchioUser.img_profile !== req.imageUrl) {
      usersService.eliminaImmagineProfilo(vecchioUser.img_profile);
    }

    const isStessoUtente = req.user?.id === id;
    const token = isStessoUtente ? usersService.generaToken(user) : null;
    res.json({ successo: true, dati: token ? { user, token } : user });
  } catch (err) { next(err); }
};

// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await usersService.elimina(id);
    res.json({ successo: true, dati: result });
  } catch (err) { next(err); }
};

module.exports = { registra, login, getAll, getById, aggiorna, aggiornaImmagineProfilo, elimina };
