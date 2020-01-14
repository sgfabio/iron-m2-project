// routes/auth.js
const express = require("express");
const router = express.Router();
// User model
const User = require("../models/user");
const Place = require("../models/place");
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
// adding passport for auth routes
const passport = require("passport");
// cloudinaary config
const uploadCloud = require('../config/cloudinary.js');

//________________________________________________________SIGN UP___________________________________________________________//
//GET
router.get("/signup", (req, res, next) => { 
  res.render("auth/signup");
});

//POST
router.post("/signup", (req, res, next) => {
  const {
    username,
    password,
    email,
  } = req.body;

  //CHECKING CONTENT
  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  //CHEKING PASSWORD LENGTH
  if (password.length < 6) {
    res.render("auth/signup", {
      errorMessage: "Password shoul be at least 6 characters"
    });
    return;
  }

  //CHEKING USERNAME
  User
  .findOne({username})
  .then(user => {
    if (user) {
      res.render("auth/signup", {
          errorMessage: "The username already exists!"
    });
        return;
  }

  //BCRYPTING PASSWORD
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  //CREATING USER
  User
  .create({ username, email, password: hashPass })
  .then(() => {
    res.redirect("/");
  })
  .catch(error => {
    console.log(error);
  })
})
  .catch(error => {next(error);
  })
});

//________________________________________________________LOGIN___________________________________________________________//
//GET
router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    message: req.flash("error")
  });
});

//POST
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//________________________________________________________LOGIN-GOOGLE___________________________________________________________//
//GET
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/signup" 
  })
);

//________________________________________________________PROFILE___________________________________________________________//

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('auth/profile', {loggedIn: req.user});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

//________________________________________________________OFFER_____________________________________________________________//
//GET 
router.get('/offer', ensureAuthenticated, (req, res) => {
  res.render('auth/offer', {loggedIn: req.user});
});
//POST --- TESTE!!! precisa terminar o form
router.post('/offer', uploadCloud.single('photo'), (req, res, next) => {
  const { name, description, neighborhood, capacity, address, available, price } = req.body;
  //const imgPath = req.file.url;
  const newPlace = new Place({name, description, neighborhood, capacity, address, available, price})
  console.log(req.body)

  newPlace
  .save()
  .then(place => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});

//________________________________________________________RENT_____________________________________________________________//

router.get('/rent', ensureAuthenticated, (req, res) => {
  res.render('auth/rent', {loggedIn: req.user});
});

//________________________________________________________LOGOUT____________________________________________________________//
router.get("/logout", (req, res) => { //ARRUMAR!!!
  req.logout();
  res.redirect("/login");
});

module.exports = router;