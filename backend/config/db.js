require('dotenv').config();

// 'pg' è il pacchetto Node.js che ci permette di connetterci a PostgreSQL
const { Pool } = require('pg');

// Pool = un gruppo di connessioni riutilizzabili al database.
// Invece di aprire e chiudere una connessione ad ogni query,
// il pool ne mantiene alcune aperte e pronte, migliorando le performance.
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
});

// Questi sono eventi del pool: scattano automaticamente in certi momenti
pool.on('connect', () => console.log('EventHUB Database connesso'));
pool.on('error', (err) => console.error('Errore connessione database EventHUB:', err));

// Esportiamo il pool così ogni model può usarlo per eseguire query
module.exports = pool;