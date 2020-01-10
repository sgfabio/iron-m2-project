require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

const index = require('./routes/index');

app.use('/', index);

app.listen(process.env.PORT, () => console.log(`rodando na porta ${process.env.PORT}`));