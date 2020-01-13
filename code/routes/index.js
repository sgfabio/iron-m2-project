const express = require('express');
const router  = express.Router();
const Place = require("../models/place");

/* GET home page. */
router.get('/', (req, res) => {
  Place
  .find()
  .then(places => res.render('index', {loggedIn: req.user, places})) 
  .catch(err => console.log(err))
});



module.exports = router;