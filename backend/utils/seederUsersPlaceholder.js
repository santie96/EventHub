const pool = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUND = 12;

const usersPlaceholder = [
  { name: 'Marco', surname: 'Rossi', email: 'marco.rossi@example.com', username: 'marcorossi', location: 'Roma', indirizzo: 'Via Appia 12', img_profile: 'https://i.pravatar.cc/300?img=1', password: 'Marco1', role: 'admin' },
  { name: 'Laura', surname: 'Bianchi', email: 'laura.bianchi@example.com', username: 'laurabianchi', location: 'Milano', indirizzo: 'Corso Garibaldi 45', img_profile: 'https://i.pravatar.cc/300?img=2', password: 'Laura1', role: 'admin' },
  { name: 'Davide', surname: 'Ferrari', email: 'davide.ferrari@example.com', username: 'davideferrari', location: 'Napoli', indirizzo: 'Via Toledo 88', img_profile: 'https://i.pravatar.cc/300?img=3', password: 'Davide1', role: 'admin' },

  { name: 'Giulia', surname: 'Romano', email: 'giulia.romano@example.com', username: 'giuliaromano', location: 'Ancona', indirizzo: 'Via del Porto 7', img_profile: 'https://i.pravatar.cc/300?img=4', password: 'Giulia1', role: 'organizer' },
  { name: 'Alessandro', surname: 'Gallo', email: 'alessandro.gallo@example.com', username: 'alessandrogallo', location: 'Firenze', indirizzo: 'Via dei Calzaiuoli 21', img_profile: 'https://i.pravatar.cc/300?img=5', password: 'Alessandro1', role: 'organizer' },
  { name: 'Sara', surname: 'Conti', email: 'sara.conti@example.com', username: 'saraconti', location: 'Roma', indirizzo: 'Viale Trastevere 103', img_profile: 'https://i.pravatar.cc/300?img=6', password: 'Sara1', role: 'organizer' },
  { name: 'Matteo', surname: 'Greco', email: 'matteo.greco@example.com', username: 'matteogreco', location: 'Milano', indirizzo: 'Via Torino 19', img_profile: 'https://i.pravatar.cc/300?img=7', password: 'Matteo1', role: 'organizer' },
  { name: 'Francesca', surname: 'Marini', email: 'francesca.marini@example.com', username: 'francescamarini', location: 'Napoli', indirizzo: 'Piazza Dante 5', img_profile: 'https://i.pravatar.cc/300?img=8', password: 'Francesca1', role: 'organizer' },

  { name: 'Luca', surname: 'Esposito', email: 'luca.esposito@example.com', username: 'lucaesposito', location: 'Ancona', indirizzo: 'Corso Mazzini 31', img_profile: 'https://i.pravatar.cc/300?img=9', password: 'Luca1', role: 'partecipant' },
  { name: 'Elena', surname: 'Ricci', email: 'elena.ricci@example.com', username: 'elenaricci', location: 'Firenze', indirizzo: 'Via Romana 14', img_profile: 'https://i.pravatar.cc/300?img=10', password: 'Elena1', role: 'partecipant' },
  { name: 'Andrea', surname: 'Moretti', email: 'andrea.moretti@example.com', username: 'andreamoretti', location: 'Roma', indirizzo: 'Via Nazionale 62', img_profile: 'https://i.pravatar.cc/300?img=11', password: 'Andrea1', role: 'partecipant' },
  { name: 'Martina', surname: 'Lombardi', email: 'martina.lombardi@example.com', username: 'martinalombardi', location: 'Milano', indirizzo: 'Viale Monza 140', img_profile: 'https://i.pravatar.cc/300?img=12', password: 'Martina1', role: 'partecipant' },
  { name: 'Simone', surname: 'Barbieri', email: 'simone.barbieri@example.com', username: 'simonebarbieri', location: 'Napoli', indirizzo: 'Via Chiaia 26', img_profile: 'https://i.pravatar.cc/300?img=13', password: 'Simone1', role: 'partecipant' },
  { name: 'Chiara', surname: 'Fontana', email: 'chiara.fontana@example.com', username: 'chiarafontana', location: 'Ancona', indirizzo: 'Via Conero 9', img_profile: 'https://i.pravatar.cc/300?img=14', password: 'Chiara1', role: 'partecipant' },
  { name: 'Federico', surname: 'Santoro', email: 'federico.santoro@example.com', username: 'federicosantoro', location: 'Firenze', indirizzo: 'Borgo San Frediano 52', img_profile: 'https://i.pravatar.cc/300?img=15', password: 'Federico1', role: 'partecipant' },
  { name: 'Valentina', surname: 'Caruso', email: 'valentina.caruso@example.com', username: 'valentinacaruso', location: 'Roma', indirizzo: 'Via Ostiense 77', img_profile: 'https://i.pravatar.cc/300?img=16', password: 'Valentina1', role: 'partecipant' },
  { name: 'Nicola', surname: 'Rinaldi', email: 'nicola.rinaldi@example.com', username: 'nicolarinaldi', location: 'Milano', indirizzo: 'Via Brera 11', img_profile: 'https://i.pravatar.cc/300?img=17', password: 'Nicola1', role: 'partecipant' },
  { name: 'Ilaria', surname: 'Martini', email: 'ilaria.martini@example.com', username: 'ilariamartini', location: 'Napoli', indirizzo: 'Via Partenope 33', img_profile: 'https://i.pravatar.cc/300?img=18', password: 'Ilaria1', role: 'partecipant' },
];

const seedUsersPlaceholder = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Seeder utenti placeholder saltato: NODE_ENV non è "development".');
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    await client.query('ALTER SEQUENCE users_id_seq MINVALUE 1 RESTART WITH 1');

    for (const user of usersPlaceholder) {
      const password_hash = await bcrypt.hash(user.password, SALT_ROUND);

      await client.query(
        `INSERT INTO users (name, surname, email, username, location, indirizzo, img_profile, password_hash, role)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [user.name, user.surname, user.email, user.username, user.location, user.indirizzo, user.img_profile, password_hash, user.role]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeder utenti placeholder completato: creati ${usersPlaceholder.length} utenti.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Errore nel seeder utenti placeholder:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = seedUsersPlaceholder;
