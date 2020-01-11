require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user");
const Place = require("./models/place");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

//Session middleware
app.use(
  session({
    secret: "project2",
    cookie: {
      maxAge: 1200000
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    }),
    resave: true,
    saveUninitialized: true
  })
);

// PASSPORT CONFIG

// cookie
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

// session
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// initialising passport
app.use(passport.initialize());
app.use(passport.session());

// adding error handling flash
app.use(flash());

// passport local strategy config
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, next) => {
      User.findOne(
        {
          username
        },
        (err, user) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return next(null, false, {
              message: "Incorrect username"
            });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, {
              message: "Incorrect password"
            });
          }

          // success - user is logged in!
          app.locals.user = user;
          return next(null, user);
        }
      );
    }
  )
);

//ROUTES
const index = require("./routes/index");
app.use("/", index);

const auth = require('./routes/auth');
app.use('/', auth);

//CHECKING PORT
app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`)
);

module.exports = app;
