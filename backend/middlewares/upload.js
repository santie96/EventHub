const multer = require('multer');
const fs = require('fs');
const path = require('path');

const profilesDir = path.join(__dirname, '..', 'uploads', 'profiles');
const eventsDir = path.join(__dirname, '..', 'uploads', 'events');

fs.mkdirSync(profilesDir, { recursive: true });
fs.mkdirSync(eventsDir, { recursive: true });

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path.join(profilesDir, req.params.id);
        fs.mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const userDir = path.join(profilesDir, req.params.id);
        const oldFiles = fs.readdirSync(userDir)
            .filter(name => name.startsWith(`${req.params.id}-profilepic.`));

        oldFiles.forEach(name => {
            try {
                fs.unlinkSync(path.join(userDir, name));
            } catch {}
        });

        const filename = `${req.params.id}-profilepic${ext}`;
        cb(null, filename);
    }
});

const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const eventDir = path.join(eventsDir, req.params.id);
        fs.mkdirSync(eventDir, { recursive: true });
        cb(null, eventDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const eventDir = path.join(eventsDir, req.params.id);
        const oldFiles = fs.readdirSync(eventDir)
            .filter(name => name.startsWith(`${req.params.id}-image.`));

        oldFiles.forEach(name => {
            try {
                fs.unlinkSync(path.join(eventDir, name));
            } catch {}
        });

        const filename = `${req.params.id}-image${ext}`;
        cb(null, filename);
    }
});

const filterImage = (req, file, cb) => {
    const mimeOK = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
    const extOk = ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file.originalname).toLowerCase());

    if (mimeOK && extOk) {
        cb(null, true);
    } else {
        const err = new Error('Formato non supportato: carica un file jpg, jpeg, png o webp');
        err.statusCode = 400;
        cb(err, false);
    }
};

const upload = {
    profile: multer({
        storage: profileStorage,
        fileFilter: filterImage,
        limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
    }),
    event: multer({
        storage: eventStorage,
        fileFilter: filterImage,
        limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
    })
};

module.exports = upload;
