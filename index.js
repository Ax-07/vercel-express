const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const db = require("./models"); // Importation du modèle de la base de données
db.sequelize.sync().then(()=> console.log('db synchronisé')); // Synchronisation du modèle avec la base de données

app.use('/api/todos', require('./routes/todo.routes'));
app.use('/api/figures', require('./routes/figure.routes'));

app.use('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });