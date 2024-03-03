const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
const pg = require('pg');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL ,
})

app.use('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });