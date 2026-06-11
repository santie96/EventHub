require('dotenv').config();
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const fs          = require('fs');
const path        = require('path');
const usersModel = require('../models/usersModel');

const SALT_ROUND = 12;
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
const profilesDir = path.join(uploadsDir, 'profiles');

const isDentroCartella = (filePath, cartella) => {
  const relative = path.relative(cartella, filePath);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const generaToken = (user) =>
  jwt.sign(
    {
      id:            user.id,
      name:          user.name,
      surname:       user.surname,
      username:      user.username,
      location:      user.location,
      indirizzo:     user.indirizzo,
      img_profile:   user.img_profile,
      email:         user.email,
      role:          user.role,
      token_version: user.token_version
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

const getPathImmagineProfilo = (img_profile) => {
  if (!img_profile) return null;

  let pathname = img_profile;

  try {
    pathname = new URL(img_profile).pathname;
  } catch {
    pathname = img_profile;
  }

  if (!pathname.startsWith('/uploads/profiles/')) return null;

  const relativePath = pathname.replace(/^\/uploads\//, '');
  const filePath = path.resolve(uploadsDir, relativePath);

  if (!isDentroCartella(filePath, uploadsDir)) return null;

  return filePath;
};

const eliminaImmagineProfilo = (img_profile) => {
  const filePath = getPathImmagineProfilo(img_profile);

  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch {}
  }
};

const eliminaCartellaProfilo = (id) => {
  const userDir = path.resolve(profilesDir, String(id));

  if (isDentroCartella(userDir, profilesDir)) {
    try {
      fs.rmSync(userDir, { recursive: true, force: true });
    } catch {}
  }
};

// Registrazione
const registra = async ({ name, surname, email, username, location, indirizzo, img_profile, role, password_hash }) => {
  const errori = [];

  const emailExists = await usersModel.findByEmail(email);
  if (emailExists.rows.length) {
    errori.push('Email gia presente');
  }

  const usernameExists = await usersModel.findByUsername(username);
  if (usernameExists.rows.length) {
    errori.push('Username gia presente');
  }

  if (errori.length) {
    const err = new Error(errori.join('\n'));
    err.statusCode = 409;
    throw err;
  }

  const hash   = await bcrypt.hash(password_hash, SALT_ROUND);

  const result = await usersModel.create({ name, surname, email, username, location, indirizzo, img_profile, role, password_hash: hash });
  return result.rows[0];
};

// Login
const login = async ({ email, password }) => {
  const result = await usersModel.findByEmail(email);
  const user = result.rows[0];

  if (!user) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  const token = generaToken(user);

  return token;
};

const getAll = async () => {
  const result = await usersModel.findAll();
  return result.rows;
};

const getById = async (id) => {
  const result = await usersModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Utente non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const aggiorna = async (id, dati) => {
  await getById(id);
  const errori = [];

  if (dati.email) {
    const emailExists = await usersModel.findByEmail(dati.email);
    if (emailExists.rows.length && emailExists.rows[0].id !== id) {
      errori.push('Email gia presente');
    }
  }

  if (dati.username) {
    const usernameExists = await usersModel.findByUsername(dati.username);
    if (usernameExists.rows.length && usernameExists.rows[0].id !== id) {
      errori.push('Username gia presente');
    }
  }

  if(dati.password_hash){
    const hash = await bcrypt.hash(dati.password_hash, SALT_ROUND);
    await usersModel.updatePassword(id, hash);
    delete dati.password_hash
  }
  
  if (errori.length) {
    const err = new Error(errori.join('\n'));
    err.statusCode = 409;
    throw err;
  }

  const result = await usersModel.update(id, dati);
  return result.rows[0];
};

const elimina = async (id) => {
  await getById(id);
  await usersModel.remove(id);
  eliminaCartellaProfilo(id);
  return { message: 'Utente eliminato' };
};

// Esportazione
module.exports = { registra, login, getAll, getById, aggiorna, elimina, generaToken, eliminaImmagineProfilo };
