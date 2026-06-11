const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

const SALT_ROUND = 12;

const seedAdmin = async () => {
    const email    = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const username = process.env.ADMIN_USERNAME;
    const name     = process.env.ADMIN_NAME    || 'Admin';
    const surname  = process.env.ADMIN_SURNAME || 'Sistema';

    if (process.env.NODE_ENV !== 'development') {
        console.warn('Seeder saltato: NODE_ENV non è "development".');
        console.warn('Per creare l\'admin, imposta NODE_ENV=development nel .env');
        return;
    }

    if (!email || !password) {
        console.warn('Seeder admin saltato: ADMIN_EMAIL o ADMIN_PASSWORD mancanti nel .env');
        return;
    }

    try {
        const verificaUser = await usersModel.findByEmail(email);
        if (verificaUser.rows.length) {
            console.log('Admin già presente, seeder saltato.');
            return;
        }

        const hash = await bcrypt.hash(password, SALT_ROUND);
        await usersModel.create({ name, surname, email, username, password_hash: hash, role: 'admin' });
        console.log(`Admin creato! Nome: ${name} ${surname} - Email: ${email} - Username: ${username}`);
    } catch (err) {
        console.error('Errore nel seeder admin:', err.message);
    }
};

module.exports = seedAdmin;