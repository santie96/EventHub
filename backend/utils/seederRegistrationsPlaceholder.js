const pool = require('../config/db');

const registrationsPlaceholder = [
  { user_id: 9,  event_id: 1,  seats: 2 },
  { user_id: 9,  event_id: 5,  seats: 1 },
  { user_id: 9,  event_id: 11, seats: 1 },

  { user_id: 10, event_id: 2,  seats: 1 },
  { user_id: 10, event_id: 6,  seats: 3 },
  { user_id: 10, event_id: 16, seats: 1 },

  { user_id: 11, event_id: 3,  seats: 2 },
  { user_id: 11, event_id: 10, seats: 1 },
  { user_id: 11, event_id: 21, seats: 1 },

  { user_id: 12, event_id: 4,  seats: 1 },
  { user_id: 12, event_id: 7,  seats: 2 },

  { user_id: 13, event_id: 8,  seats: 1 },
  { user_id: 13, event_id: 12, seats: 1 },
  { user_id: 13, event_id: 25, seats: 1 },

  { user_id: 14, event_id: 9,  seats: 1 },
  { user_id: 14, event_id: 13, seats: 1 },

  { user_id: 15, event_id: 14, seats: 1 },
  { user_id: 15, event_id: 17, seats: 2 },
  { user_id: 15, event_id: 20, seats: 1 },

  { user_id: 16, event_id: 15, seats: 1 },
  { user_id: 16, event_id: 18, seats: 1 },

  { user_id: 17, event_id: 19, seats: 1 },
  { user_id: 17, event_id: 22, seats: 2 },

  { user_id: 18, event_id: 23, seats: 1 },
  { user_id: 18, event_id: 24, seats: 1 },
];

const seedRegistrationsPlaceholder = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Seeder registrations placeholder saltato: NODE_ENV non è "development".');
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('TRUNCATE TABLE registrations RESTART IDENTITY CASCADE');
    await client.query('ALTER SEQUENCE registrations_id_seq MINVALUE 1 RESTART WITH 1');

    for (const reg of registrationsPlaceholder) {
      const userResult = await client.query(
        'SELECT id FROM users WHERE id = $1',
        [reg.user_id]
      );

      const eventResult = await client.query(
        'SELECT id, seats_available, available FROM events WHERE id = $1',
        [reg.event_id]
      );

      if (!userResult.rows.length || !eventResult.rows.length) {
        throw new Error(
          `User o Evento non trovato: user_id=${reg.user_id}, event_id=${reg.event_id}`
        );
      }

      const evento = eventResult.rows[0];

      if (evento.seats_available < reg.seats || !evento.available) {
        throw new Error(
          `Posti insufficienti per: user_id=${reg.user_id}, event_id=${reg.event_id} ` +
          `(richiesti=${reg.seats}, disponibili=${evento.seats_available})`
        );
      }

      await client.query(
        `INSERT INTO registrations (user_id, event_id, seats)
         VALUES ($1, $2, $3)`,
        [reg.user_id, reg.event_id, reg.seats]
      );

      await client.query(
        `UPDATE events
         SET seats_available = seats_available - $2,
             available       = CASE WHEN seats_available - $2 <= 0 THEN false ELSE true END
         WHERE id = $1`,
        [reg.event_id, reg.seats]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeder registrations completato: create ${registrationsPlaceholder.length} registrazioni.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Errore nel seeder registrations:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = seedRegistrationsPlaceholder;