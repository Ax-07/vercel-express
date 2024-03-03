const express = require('express');
const app = express();
const port = 3000;

const db = require("./models");
db.sequelize.sync().then(()=> console.log('db synchronisé'));
const todoRoute = require('./routes/todo.routes');
app.use('/api/todo',todoRoute);

app.use('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });