const pool = require('../config/db');

const eventiPlaceholder = [
  { organizer_id: 4, title: 'Rock Night Live', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=800&fit=crop', description: 'Concerto rock dal vivo con band emergenti e artisti locali.', date: '2026-06-15', location: 'Roma', indirizzo: 'Via Appia 12', price: 18.00, max_seats: 120, category: 'Musica' },
  { organizer_id: 4, title: 'Jazz sotto le Stelle', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&h=800&fit=crop', description: 'Serata jazz all aperto con musicisti professionisti.', date: '2026-06-22', location: 'Milano', indirizzo: 'Corso Garibaldi 45', price: 0, max_seats: 80, category: 'Musica' },
  { organizer_id: 4, title: 'Festival Acustico', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=800&fit=crop', description: 'Evento musicale dedicato a performance acustiche e cantautorato.', date: '2026-07-05', location: 'Firenze', indirizzo: 'Via dei Calzaiuoli 21', price: 12.50, max_seats: 25, category: 'Musica' },
  { organizer_id: 4, title: 'Electronic Sound Experience', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop', description: 'Serata dedicata alla musica elettronica con DJ set.', date: '2026-07-18', location: 'Napoli', indirizzo: 'Via Toledo 88', price: 25.00, max_seats: 200, category: 'Musica' },
  { organizer_id: 4, title: 'Concerto Privato Piano & Voice', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop', description: 'Evento musicale intimo con posti molto limitati.', date: '2026-08-02', location: 'Ancona', indirizzo: 'Via del Porto 7', price: 45.00, max_seats: 3, category: 'Musica' },

  { organizer_id: 5, title: 'Torneo di Calcetto', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop', description: 'Torneo amatoriale di calcetto aperto a squadre locali.', date: '2026-06-18', location: 'Roma', indirizzo: 'Viale Trastevere 103', price: 8.00, max_seats: 50, category: 'Sport' },
  { organizer_id: 5, title: 'Corsa Urbana 10K', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=800&fit=crop', description: 'Gara podistica cittadina su percorso urbano di 10 chilometri.', date: '2026-06-29', location: 'Milano', indirizzo: 'Via Torino 19', price: 0, max_seats: 300, category: 'Sport' },
  { organizer_id: 5, title: 'Workshop di Arrampicata', image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&h=800&fit=crop', description: 'Lezione introduttiva all arrampicata sportiva con istruttori qualificati.', date: '2026-07-10', location: 'Firenze', indirizzo: 'Via Romana 14', price: 22.00, max_seats: 15, category: 'Sport' },
  { organizer_id: 5, title: 'Lezione di Yoga al Parco', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop', description: 'Sessione di yoga guidata all aperto per principianti e intermedi.', date: '2026-07-21', location: 'Napoli', indirizzo: 'Piazza Dante 5', price: 0, max_seats: 20, category: 'Sport' },
  { organizer_id: 5, title: 'Finale Torneo Tennis', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop', description: 'Evento sportivo con accesso ristretto per la finale del torneo.', date: '2026-08-06', location: 'Ancona', indirizzo: 'Corso Mazzini 31', price: 15.00, max_seats: 2, category: 'Sport' },

  { organizer_id: 6, title: 'AI Developer Conference', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop', description: 'Conferenza dedicata a intelligenza artificiale, sviluppo software e nuovi strumenti digitali.', date: '2026-06-20', location: 'Milano', indirizzo: 'Viale Monza 140', price: 35.00, max_seats: 150, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Cybersecurity Day', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop', description: 'Giornata formativa sulla sicurezza informatica e protezione dei dati.', date: '2026-07-02', location: 'Roma', indirizzo: 'Via Nazionale 62', price: 0, max_seats: 100, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Web Development Summit', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop', description: 'Evento per sviluppatori frontend, backend e full stack.', date: '2026-07-14', location: 'Firenze', indirizzo: 'Borgo San Frediano 52', price: 29.90, max_seats: 75, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Startup Tech Pitch', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop', description: 'Presentazione di startup tecnologiche davanti a mentor e investitori.', date: '2026-07-28', location: 'Napoli', indirizzo: 'Via Chiaia 26', price: 0, max_seats: 30, category: 'Tecnologia' },
  { organizer_id: 6, title: 'Workshop Git e Database', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=800&fit=crop', description: 'Laboratorio pratico con posti limitati su Git, PostgreSQL e progettazione database.', date: '2026-08-09', location: 'Ancona', indirizzo: 'Via Conero 9', price: 19.00, max_seats: 4, category: 'Tecnologia' },

  { organizer_id: 7, title: 'Serata Teatro Classico', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=800&fit=crop', description: 'Spettacolo teatrale ispirato ai grandi classici della tradizione italiana.', date: '2026-06-25', location: 'Roma', indirizzo: 'Via Ostiense 77', price: 16.00, max_seats: 90, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Mostra d Arte Moderna', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=800&fit=crop', description: 'Esposizione di opere contemporanee con visita guidata.', date: '2026-07-04', location: 'Milano', indirizzo: 'Via Brera 11', price: 0, max_seats: 60, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Cinema sotto le Stelle', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop', description: 'Proiezione serale all aperto di film italiani e internazionali.', date: '2026-07-16', location: 'Firenze', indirizzo: 'Piazza Santa Croce 8', price: 7.50, max_seats: 110, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Reading Letterario', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200&h=800&fit=crop', description: 'Incontro culturale con letture, autori e discussione aperta.', date: '2026-07-31', location: 'Napoli', indirizzo: 'Via Partenope 33', price: 0, max_seats: 18, category: 'Cultura e Spettacolo' },
  { organizer_id: 7, title: 'Spettacolo Privato di Cabaret', image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200&h=800&fit=crop', description: 'Serata di cabaret con accesso molto limitato.', date: '2026-08-12', location: 'Ancona', indirizzo: 'Piazza del Plebiscito 4', price: 30.00, max_seats: 1, category: 'Cultura e Spettacolo' },

  { organizer_id: 8, title: 'Degustazione Vini Italiani', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=800&fit=crop', description: 'Percorso di degustazione con vini selezionati da diverse regioni italiane.', date: '2026-06-27', location: 'Firenze', indirizzo: 'Via della Scala 16', price: 24.00, max_seats: 40, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Street Food Festival', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop', description: 'Evento dedicato al cibo di strada con stand locali e prodotti artigianali.', date: '2026-07-08', location: 'Napoli', indirizzo: 'Via San Biagio 42', price: 0, max_seats: 250, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Cena Gourmet Regionale', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop', description: 'Cena a tema con piatti tipici regionali e abbinamenti consigliati.', date: '2026-07-19', location: 'Roma', indirizzo: 'Piazza Navona 10', price: 38.00, max_seats: 35, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Corso di Pasta Fresca', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&h=800&fit=crop', description: 'Laboratorio pratico per imparare a preparare pasta fresca fatta a mano.', date: '2026-08-01', location: 'Milano', indirizzo: 'Corso Como 6', price: 20.00, max_seats: 10, category: 'Enogastronomia' },
  { organizer_id: 8, title: 'Tavolo Degustazione Riservato', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop', description: 'Degustazione privata con posti estremamente limitati.', date: '2026-08-15', location: 'Ancona', indirizzo: 'Via XXIX Settembre 2', price: 55.00, max_seats: 2, category: 'Enogastronomia' },
];

const seedEventsPlaceholder = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Seeder eventi placeholder saltato: NODE_ENV non e "development".');
    return;
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE');
    await client.query('ALTER SEQUENCE events_id_seq MINVALUE 1 RESTART WITH 1');

    for (const evento of eventiPlaceholder) {
      const price   = evento.price ?? 0;
      const is_free = Number(price) === 0;

      await client.query(
        `INSERT INTO events
           (organizer_id, title, image, description, date, location, indirizzo,
            price, is_free, total_seats, seats_available, available, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10, $10 > 0, $11)`,
        [
          evento.organizer_id,
          evento.title,
          evento.image,
          evento.description,
          evento.date,
          evento.location,
          evento.indirizzo,
          price,
          is_free,
          evento.max_seats,
          evento.category,
        ]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeder eventi placeholder completato: creati ${eventiPlaceholder.length} eventi.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Errore nel seeder eventi placeholder:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = seedEventsPlaceholder;