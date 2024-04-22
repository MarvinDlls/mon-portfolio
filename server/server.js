const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const app = express();


const port = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'ton_nom_d_utilisateur',
    password: 'ton_mot_de_passe',
    database: 'ta_base_de_donnees'
});


db.connect(err => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.post('/submit-form', (req, res) => {
    
    const { name, email, message } = req.body;

    
    if (!name || !email || !message) {
        return res.status(400).send('Tous les champs sont requis');
    }

    
    const query = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans la base de données :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Message envoyé avec succès');
    });
});


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
