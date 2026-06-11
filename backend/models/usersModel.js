

const pool = require('../config/db');

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    indirizzo VARCHAR(255),
    img_profile VARCHAR(500),
    password_hash VARCHAR(255) NOT NULL,
    role         VARCHAR(20)   NOT NULL DEFAULT 'partecipant'
                  CHECK (role IN ('admin', 'partecipant', 'organizer')),
    token_version INTEGER       NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () =>
  pool.query(
    'SELECT id, name, surname, email, username, location, indirizzo, img_profile, role FROM users ORDER BY id'
  );

const findById = (id) =>
  pool.query(
    'SELECT id, name, surname, email, username, location, indirizzo, img_profile, role, token_version FROM users WHERE id = $1',
    [id]
  );

const findByEmail = (email) =>
  pool.query('SELECT * FROM users WHERE email = $1', [email]);

const findByUsername = (username) =>
  pool.query('SELECT * FROM users WHERE username = $1', [username]);


const create = ({ name, surname, email, username, location, indirizzo, img_profile, password_hash, role }) =>
  pool.query(
    `INSERT INTO users (name, surname, email, username, location, indirizzo, img_profile, password_hash, role)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, name, surname, email, username, location, indirizzo, img_profile, role`,
    [name, surname, email, username, location, indirizzo, img_profile, password_hash, role]
  );

const update = (id, { name, surname, email, username, location, indirizzo, img_profile, role }) =>
  pool.query(
    `UPDATE users
     SET name    = COALESCE($1, name),
         surname = COALESCE($2, surname),
         email   = COALESCE($3, email),
         username  = COALESCE($4, username),
         location = COALESCE($5, location),
         indirizzo = COALESCE($6, indirizzo),
         img_profile = COALESCE($7, img_profile),
         role = COALESCE($8, role),
         token_version = token_version + CASE WHEN $8 IS NULL THEN 0 ELSE 1 END
     WHERE id = $9
     RETURNING id, name, surname, email, username, location, indirizzo, img_profile, role, token_version`,
    [name, surname, email, username, location, indirizzo, img_profile, role, id]
  );


const updatePassword = (id, hashedPassword) =>
  pool.query(
    `UPDATE users
     SET password_hash     = $1,
     token_version = token_version + 1
     WHERE id = $2
     RETURNING id`,
    [hashedPassword, id]
  );

const remove = (id) =>
  pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

module.exports = {
  init, findAll, findById, findByEmail, findByUsername,
  create, update, updatePassword, remove
};
