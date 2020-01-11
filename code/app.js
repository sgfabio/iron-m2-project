require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const express = require("express");
const hbs = require("hbs");
const mongoose = require('mongoose');
const path = require("path");
const User = require('./models/user');
const Place = require('./models/place');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; 
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const app = express();

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));


const index = require("./routes/index");
app.use("/", index);

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`)
);
