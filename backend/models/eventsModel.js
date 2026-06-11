const pool = require('../config/db');

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    organizer_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    image VARCHAR(500),
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(500) NOT NULL,
    indirizzo VARCHAR(500),
    price NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    is_free BOOLEAN NOT NULL DEFAULT TRUE,
    total_seats INTEGER NOT NULL DEFAULT 1 CHECK(total_seats > 0),
    seats_available INTEGER NOT NULL DEFAULT 1 CHECK(seats_available >= 0),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE
);
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile
     ORDER BY e.date ASC`
  );

const findById = (id) =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     WHERE e.id = $1
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
    [id]
  );

const findByCategory = (category) =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     WHERE e.category = $1
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
    [category]
  );

const findByOrganizerId = (id) =>
  pool.query(
    `SELECT
       e.*,
       u.name || ' ' || u.surname AS organizer_fullname,
       u.username AS organizer_username,
       u.img_profile AS organizer_img_profile,
       COALESCE(SUM(reg.seats), 0)::int AS seats_prenotati
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     LEFT JOIN registrations reg ON reg.event_id = e.id
     WHERE e.organizer_id = $1
     GROUP BY e.id, u.name, u.surname, u.username, u.img_profile`,
    [id]
  );

// max_seats dal body → total_seats (fisso) e seats_available (dinamico)
const create = (id, { title, image, description, date, location, indirizzo, price, max_seats, category }) =>
  pool.query(
    `INSERT INTO events
       (title, image, description, date, location, indirizzo,
        price, is_free, total_seats, seats_available, "available", category, organizer_id)
     VALUES ($1, $2, $3, $4, $5, $6,
             COALESCE($7, 0), COALESCE($7, 0) = 0,
             $8, $8, $8 > 0,
             $9, $10)
     RETURNING *`,
    [title, image, description, date, location, indirizzo, price, max_seats, category, id]
  );

// max_seats dal body aggiorna solo seats_available (total_seats è immutabile)
const update = (id, { title, image, description, date, location, indirizzo, price, max_seats, category }) =>
  pool.query(
    `UPDATE events
     SET title           = COALESCE($1, title),
         image           = COALESCE($2, image),
         description     = COALESCE($3, description),
         date            = COALESCE($4, date),
         location        = COALESCE($5, location),
         indirizzo       = COALESCE($6, indirizzo),
         price           = COALESCE($7, price),
         is_free         = CASE WHEN $7 IS NULL THEN is_free ELSE $7 = 0 END,
         seats_available = CASE WHEN $8::INTEGER IS NULL THEN seats_available
                                ELSE GREATEST(0, $8::INTEGER - (total_seats - seats_available)) END,
         total_seats     = COALESCE($8::INTEGER, total_seats),
         "available"     = CASE WHEN $8::INTEGER IS NULL THEN "available"
                                ELSE ($8::INTEGER > (total_seats - seats_available)) END,
         category        = COALESCE($9, category)
     WHERE id = $10
     RETURNING *`,
    [title, image, description, date, location, indirizzo, price, max_seats, category, id]
  );
  
const decrementa = (id, seats = 1) =>
  pool.query(
    `UPDATE events
     SET seats_available = seats_available - $2,
    "available"     = CASE WHEN seats_available - $2 <= 0 THEN false ELSE true END
WHERE id = $1 AND seats_available >= $2 AND "available" = true
     RETURNING *`,
    [id, seats]
  );

const incrementa = (id, seats = 1) =>
  pool.query(
    `UPDATE events
     SET seats_available = seats_available + $2,
    "available"     = true
     WHERE id = $1
     RETURNING *`,
    [id, seats]
  );

const remove = (id) =>
  pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);

module.exports = {
  init, findAll, findById, findByCategory, findByOrganizerId,
  create, update, remove,
  incrementa, decrementa
};