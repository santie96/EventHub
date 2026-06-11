const router = require('express').Router();
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');
const controller = require('../controllers/usersControllers');
const upload = require('../middlewares/upload');
const buildImageUrl = require('../middlewares/buildImageUrl');

const {
  autenticato,
  soloAdmin,
  soloAdminOStessoUtente,
} = require('../middlewares/auth');
const limiter = require('express-rate-limit');

const limiterAuth = limiter({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { successo: false, errore: 'Troppi tentativi, riprova tra qualche minuto' }
});

// Regole di validazione
const regolaRegistra = [
  body('name')
    .trim()
    .notEmpty().withMessage('Il nome e obbligatorio')
    .isLength({ max: 255 }).withMessage('Il nome non puo superare 255 caratteri'),

  body('surname')
    .trim()
    .notEmpty().withMessage('Il cognome e obbligatorio')
    .isLength({ max: 255 }).withMessage('Il cognome non puo superare 255 caratteri'),

  body('email')
    .trim().toLowerCase()
    .notEmpty().withMessage('L\'email e obbligatoria')
    .isEmail().withMessage('Formato email non valido'),

  body('username')
    .trim()
    .notEmpty().withMessage('Lo username e obbligatorio')
    .isLength({ min: 3 }).withMessage('Lo username deve avere almeno 3 caratteri')
    .isLength({ max: 255 }).withMessage('Lo username non puo superare 255 caratteri'),

  body('location')
    .optional({ nullable: true, checkFalsy: true }).trim()
    .isLength({ max: 255 }).withMessage('La citta non puo superare 255 caratteri'),

  body('indirizzo')
    .optional({ nullable: true, checkFalsy: true }).trim()
    .isLength({ max: 255 }).withMessage('L\'indirizzo non puo superare 255 caratteri'),

  body('img_profile')
    .optional({ nullable: true, checkFalsy: true }).trim()
    .isURL().withMessage('L\'immagine profilo deve essere un URL valido')
    .isLength({ max: 500 }).withMessage('L\'immagine profilo non puo superare 500 caratteri'),

  body('role')
    .notEmpty().withMessage('Il ruolo e obbligatorio')
    .isIn(['partecipant', 'organizer']).withMessage('Il ruolo deve essere partecipant o organizer'),

  body('password_hash')
    .notEmpty().withMessage('La password e obbligatoria')
    .isLength({ min: 8 }).withMessage('La password deve avere almeno 8 caratteri')
    .isLength({ max: 100 }).withMessage('La password non puo superare 100 caratteri')
    .custom(v => {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~])/.test(v))
        throw new Error('La password deve contenere almeno una maiuscola, una minuscola, un numero e un carattere speciale');
      return true;
    }),
];

const regolaLogin = [
  body('email')
    .trim().toLowerCase()
    .notEmpty().withMessage('L\'email e obbligatoria')
    .isEmail().withMessage('Formato email non valido'),

  body('password')
    .notEmpty().withMessage('La password e obbligatoria'),
];

const regolaId = [
  param('id')
    .isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),
];

const regolaAggiorna = [
  param('id')
    .isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),

  body('name')
    .optional().trim()
    .notEmpty().withMessage('Il nome non puo essere vuoto')
    .isLength({ max: 255 }).withMessage('Il nome non puo superare 255 caratteri'),

  body('surname')
    .optional().trim()
    .notEmpty().withMessage('Il cognome non puo essere vuoto')
    .isLength({ max: 255 }).withMessage('Il cognome non puo superare 255 caratteri'),

  body('email')
    .optional().trim().toLowerCase()
    .isEmail().withMessage('Formato email non valido'),

  body('username')
    .optional().trim()
    .notEmpty().withMessage('Lo username non puo essere vuoto')
    .isLength({ min: 3 }).withMessage('Lo username deve avere almeno 3 caratteri')
    .isLength({ max: 255 }).withMessage('Lo username non puo superare 255 caratteri'),

  body('location')
    .optional({ nullable: true, checkFalsy: true }).trim()
    .isLength({ max: 255 }).withMessage('La citta non puo superare 255 caratteri'),

  body('indirizzo')
    .optional({ nullable: true, checkFalsy: true }).trim()
    .isLength({ max: 255 }).withMessage('L\'indirizzo non puo superare 255 caratteri'),

  body('img_profile')
    .optional({ nullable: true, checkFalsy: true }).trim()
    .isURL().withMessage('L\'immagine profilo deve essere un URL valido')
    .isLength({ max: 500 }).withMessage('L\'immagine profilo non puo superare 500 caratteri'),

  body('role')
    .not().exists().withMessage('Il ruolo non puo essere cambiato da questa rotta'),
];

const regolaPromuovi = [
  param('id')
    .isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),

  body('role')
    .notEmpty().withMessage('Il ruolo e obbligatorio')
    .isIn(['admin', 'organizer', 'partecipant']).withMessage('Il ruolo deve essere admin, organizer o partecipant'),
];

// Pubbliche
router.post('/registra', limiterAuth, regolaRegistra, validate, controller.registra);
router.post('/login', limiterAuth, regolaLogin, validate, controller.login);

// Solo admin puo vedere la lista completa degli utenti
router.get('/', autenticato, soloAdmin, controller.getAll);

router.get('/:id', autenticato, regolaId, validate, soloAdminOStessoUtente, controller.getById);

// puo modificare un profilo
router.patch('/:id', autenticato, regolaAggiorna, validate, soloAdminOStessoUtente, controller.aggiorna);

router.patch('/:id/img-profile',
  autenticato, regolaId, validate,
  soloAdminOStessoUtente,
  upload.profile.single('img_profile'),
  buildImageUrl('profiles'),   
  controller.aggiornaImmagineProfilo
);
router.patch('/:id/promuovi', autenticato, soloAdmin, regolaPromuovi, validate, controller.aggiorna);

// Solo admin puo eliminare un utente
router.delete('/:id', autenticato, regolaId, validate, soloAdminOStessoUtente, controller.elimina);

// Esportazione
module.exports = router;
