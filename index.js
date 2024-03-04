const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models"); // Importation du modèle de la base de données
db.sequelize.sync().then(()=> console.log('db synchronisé')); // Synchronisation du modèle avec la base de données

const todoRoute = require('./routes/todo.routes');
app.use('/api/todos', todoRoute);

app.use('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });