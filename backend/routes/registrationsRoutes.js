const router = require('express').Router();
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');
const controller = require('../controllers/registrationsControllers');
const {
  autenticato,
  soloAdmin,
  soloAdminOStessoUtente,
  soloPartecipant,
  soloAdminOOrganizerProprietarioEvento,
  soloAdminOProprietarioRegistrazione,
  soloPartecipantProprietarioRegistrazioneOOrganizerEvento,
} = require('../middlewares/auth');

// Regole di validazione
const regolaId = [
  param('id')
    .isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),
];

const regolaCrea = [
  body('event_id')
    .notEmpty().withMessage('L\'event_id e obbligatorio')
    .isInt({ min: 1 }).withMessage('event_id deve essere un numero intero positivo'),

  body('seats')
    .optional()
    .isInt({ min: 1 }).withMessage('Il numero di posti deve essere un intero positivo'),
];

router.post('/', autenticato, soloPartecipant, regolaCrea, validate, controller.crea);
router.get('/', autenticato, soloAdmin, controller.getAll);
router.get('/event/:id/public', regolaId, validate, controller.getPublicByEventId);
router.get('/event/:id', autenticato, regolaId, validate, soloAdminOOrganizerProprietarioEvento, controller.getAllByEventId);
router.get('/user/:id', autenticato, regolaId, validate, soloAdminOStessoUtente, controller.getAllByUserId);
router.get('/:id', autenticato, regolaId, validate, soloAdminOProprietarioRegistrazione, controller.getById);
router.delete('/:id', autenticato, regolaId, validate, soloPartecipantProprietarioRegistrazioneOOrganizerEvento, controller.elimina);

module.exports = router;
