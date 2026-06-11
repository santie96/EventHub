const fs = require('fs');
const path = require('path');
const eventsModel = require('../models/eventsModel');

const uploadsDir = path.resolve(__dirname, '..', 'uploads');
const eventsDir = path.join(uploadsDir, 'events');

const isDentroCartella = (filePath, cartella) => {
  const relative = path.relative(cartella, filePath);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const getPathImmagineEvento = (image) => {
  if (!image) return null;

  let pathname = image;

  try {
    pathname = new URL(image).pathname;
  } catch {
    pathname = image;
  }

  if (!pathname.startsWith('/uploads/events/')) return null;

  const relativePath = pathname.replace(/^\/uploads\//, '');
  const filePath = path.resolve(uploadsDir, relativePath);

  if (!isDentroCartella(filePath, uploadsDir)) return null;

  return filePath;
};

const eliminaImmagineEvento = (image) => {
  const filePath = getPathImmagineEvento(image);

  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch {}
  }
};

const eliminaCartellaEvento = (id) => {
  const eventDir = path.resolve(eventsDir, String(id));

  if (isDentroCartella(eventDir, eventsDir)) {
    try {
      fs.rmSync(eventDir, { recursive: true, force: true });
    } catch {}
  }
};

const crea = async (id, dati) => {
  const event = await eventsModel.create(id, dati);
  return getById(event.rows[0].id);
};

const getAll = async () => {
  const result = await eventsModel.findAll();
  return result.rows;
};

const getById = async (id) => {
  const result = await eventsModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Evento non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const getAllByCategory = async (category) => {
  const result = await eventsModel.findByCategory(category);
  return result.rows;
};

const getAllByOrganizerId = async (id) => {
  const result = await eventsModel.findByOrganizerId(id);
  return result.rows;
};

const aggiorna = async (id, dati) => {
  await getById(id);
  await eventsModel.update(id, dati);
  return getById(id);
};

const elimina = async (id) => {
  await getById(id);
  await eventsModel.remove(id);
  eliminaCartellaEvento(id);
  return { message: 'Evento eliminato' };
};

// Esportazione
module.exports = { getAll, getById, getAllByCategory, getAllByOrganizerId, crea, aggiorna, elimina, eliminaImmagineEvento };
