const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'https://votrepseudo.github.io' }));

// Lecture/écriture dans un fichier JSON
const DB_FILE = 'db.json';

// Route pour récupérer les utilisateurs
app.get('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    res.json(data.users);
});

// Route pour ajouter un utilisateur (POST)
app.post('/users', express.json(), (req, res) => {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    data.users.push(req.body);
    fs.writeFileSync(DB_FILE, JSON.stringify(data));
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on Render'));
