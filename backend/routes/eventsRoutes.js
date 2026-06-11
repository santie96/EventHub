const router = require("express").Router();
const { body, param } = require("express-validator");
const validate = require("../middlewares/validate");
const controller = require("../controllers/eventsControllers");
const upload = require("../middlewares/upload");
const buildImageUrl = require("../middlewares/buildImageUrl");

const {
  autenticato,
  soloAdminOOrganizer,
  soloAdminOOrganizerProprietarioEvento,
} = require("../middlewares/auth");

// Regole di validazione
const regolaCrea = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Il titolo e obbligatorio")
    .isLength({ max: 500 })
    .withMessage("Il titolo non puo superare 500 caratteri"),

  body("image")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("L'immagine deve essere un URL valido")
    .isLength({ max: 500 })
    .withMessage("L'immagine non puo superare 500 caratteri"),

  body("description").optional({ nullable: true, checkFalsy: true }).trim(),

  body("date")
    .notEmpty()
    .withMessage("La data e obbligatoria")
    .isISO8601()
    .withMessage("La data deve essere in formato valido"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("La citta e obbligatoria")
    .isLength({ max: 500 })
    .withMessage("La citta non puo superare 500 caratteri"),

  body("indirizzo")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("L'indirizzo non puo superare 500 caratteri"),

  body("price")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Il prezzo deve essere un numero positivo"),

  body("max_seats")
    .notEmpty()
    .withMessage("Il numero di posti e obbligatorio")
    .isInt({ min: 1 })
    .withMessage("Il numero di posti deve essere un intero positivo"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categoria e obbligatoria")
    .isLength({ max: 255 })
    .withMessage("La categoria non puo superare 255 caratteri"),
];

const regolaAggiorna = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("L'id deve essere un numero intero positivo"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Il titolo non puo essere vuoto")
    .isLength({ max: 500 })
    .withMessage("Il titolo non puo superare 500 caratteri"),

  body("image")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("L'immagine deve essere un URL valido")
    .isLength({ max: 500 })
    .withMessage("L'immagine non puo superare 500 caratteri"),

  body("description").optional({ nullable: true, checkFalsy: true }).trim(),

  body("date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La data non puo essere vuota")
    .isISO8601()
    .withMessage("La data deve essere in formato valido"),

  body("location")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La citta non puo essere vuota")
    .isLength({ max: 500 })
    .withMessage("La citta non puo superare 500 caratteri"),

  body("indirizzo")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("L'indirizzo non puo superare 500 caratteri"),

  body("price")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Il prezzo deve essere un numero positivo"),

  body("max_seats")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Il numero di posti deve essere un intero positivo o zero"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La categoria non puo essere vuota")
    .isLength({ max: 255 })
    .withMessage("La categoria non puo superare 255 caratteri"),
];

const regolaId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("L'id deve essere un numero intero positivo"),
];

const regolaCategoria = [
  param("category")
    .trim()
    .notEmpty()
    .withMessage("La categoria e obbligatoria")
    .isLength({ max: 255 })
    .withMessage("La categoria non puo superare 255 caratteri"),
];

router.post(
  "/",
  autenticato,
  soloAdminOOrganizer,
  regolaCrea,
  validate,
  controller.crea,
);
router.get("/", controller.getAll);
router.get(
  "/category/:category",
  regolaCategoria,
  validate,
  controller.getAllByCategory,
);
router.get(
  "/organizer/:id",
  regolaId,
  validate,
  controller.getAllByOrganizerId,
);
router.get("/:id", regolaId, validate, controller.getById);
router.patch(
  "/:id/image",
  autenticato,
  regolaId,
  validate,
  soloAdminOOrganizerProprietarioEvento,
  upload.event.single("image"),
  buildImageUrl("events"),
  controller.aggiornaImmagine,
);
router.patch(
  "/:id",
  autenticato,
  regolaAggiorna,
  validate,
  soloAdminOOrganizerProprietarioEvento,
  controller.aggiorna,
);
router.delete(
  "/:id",
  autenticato,
  regolaId,
  validate,
  soloAdminOOrganizerProprietarioEvento,
  controller.elimina,
);

module.exports = router;
