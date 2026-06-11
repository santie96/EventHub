require('dotenv').config();

const errorHandler = (err, req, res, next) => {

  const isUniqueError = err.code === '23505';
  const status = err.statusCode || (err.name === 'MulterError' || isUniqueError ? 400 : 500);

  let messaggio = err.message || 'Errore interno del server';

  if (err.code === 'LIMIT_FILE_SIZE') {
    messaggio = 'Il file non puo superare 5 MB';
  }

  if (isUniqueError && err.constraint?.includes('email')) {
    messaggio = 'Email gia presente';
  }

  if (isUniqueError && err.constraint?.includes('username')) {
    messaggio = 'Username gia presente';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] ${status} - ${messaggio}`);
    if (status === 500) console.error(err.stack);
  }

  res.status(status).json({ successo: false, errore: messaggio });
};

module.exports = errorHandler;
