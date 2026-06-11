const pool = require('../config/db');

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    seats INTEGER NOT NULL DEFAULT 1 CHECK(seats > 0),
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () =>
  pool.query(
    `SELECT
       reg.*,
       u.name || ' ' || u.surname AS user_fullname,
       u.email                    AS user_email,
       u.img_profile              AS user_img_profile,
       e.title                    AS event_title,
       e.description              AS event_description,
       e.location                 AS event_location,
       e.indirizzo                AS event_indirizzo,
       e.price                    AS event_price,
       e.is_free                  AS event_is_free,
       e.date                     AS event_date,
       e.organizer_id             AS event_organizer,
       e.total_seats              AS event_total_seats,
       e.seats_available          AS event_seats_available,
       e.available                AS event_available,
       e.category                 AS event_category
     FROM registrations reg
     JOIN users u ON u.id = reg.user_id
     JOIN events e ON e.id = reg.event_id
     ORDER BY reg.registered_at DESC`
  );

const findById = (id) =>
  pool.query(
    `SELECT
       reg.*,
       u.name || ' ' || u.surname AS user_fullname,
       u.email                    AS user_email,
       u.img_profile              AS user_img_profile,
       e.title                    AS event_title,
       e.description              AS event_description,
       e.location                 AS event_location,
       e.indirizzo                AS event_indirizzo,
       e.price                    AS event_price,
       e.is_free                  AS event_is_free,
       e.date                     AS event_date,
       e.organizer_id             AS event_organizer,
       e.total_seats              AS event_total_seats,
       e.seats_available          AS event_seats_available,
       e.available                AS event_available,
       e.category                 AS event_category
     FROM registrations reg
     JOIN users u ON u.id = reg.user_id
     JOIN events e ON e.id = reg.event_id
     WHERE reg.id = $1`,
    [id]
  );

const findByEventId = (id) =>
  pool.query(
    `SELECT
       reg.*,
       u.name || ' ' || u.surname AS user_fullname,
       u.email                    AS user_email,
       u.img_profile              AS user_img_profile,
       e.title                    AS event_title,
       e.description              AS event_description,
       e.location                 AS event_location,
       e.indirizzo                AS event_indirizzo,
       e.price                    AS event_price,
       e.is_free                  AS event_is_free,
       e.date                     AS event_date,
       e.organizer_id             AS event_organizer,
       e.total_seats              AS event_total_seats,
       e.seats_available          AS event_seats_available,
       e.available                AS event_available,
       e.category                 AS event_category
     FROM registrations reg
     JOIN users u ON u.id = reg.user_id
     JOIN events e ON e.id = reg.event_id
     WHERE reg.event_id = $1`,
    [id]
  );

const findByUserId = (id) =>
  pool.query(
    `SELECT
       reg.*,
       u.name || ' ' || u.surname AS user_fullname,
       u.email                    AS user_email,
       u.img_profile              AS user_img_profile,
       e.title                    AS event_title,
       e.description              AS event_description,
       e.location                 AS event_location,
       e.indirizzo                AS event_indirizzo,
       e.price                    AS event_price,
       e.is_free                  AS event_is_free,
       e.date                     AS event_date,
       e.organizer_id             AS event_organizer,
       e.total_seats              AS event_total_seats,
       e.seats_available          AS event_seats_available,
       e.available                AS event_available,
       e.category                 AS event_category
     FROM registrations reg
     JOIN users u ON u.id = reg.user_id
     JOIN events e ON e.id = reg.event_id
     WHERE reg.user_id = $1`,
    [id]
  );

const findPublicByEventId = (id) =>
  pool.query(
    `SELECT
       u.name,
       u.surname,
       u.img_profile
     FROM registrations reg
     JOIN users u ON u.id = reg.user_id
     WHERE reg.event_id = $1
     ORDER BY reg.registered_at DESC`,
    [id]
  );

const create = ({ user_id, event_id, seats }) =>
  pool.query(
    `INSERT INTO registrations (user_id, event_id, seats)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [user_id, event_id, seats]
  );

const remove = (id) =>
  pool.query('DELETE FROM registrations WHERE id = $1 RETURNING id', [id]);

module.exports = {
  init, findAll, findById, findByEventId, findByUserId,
  findPublicByEventId, create, remove
};