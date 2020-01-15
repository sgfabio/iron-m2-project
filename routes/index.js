const express = require('express');
const router  = express.Router();
const Place = require("../models/place");

/* GET home page. */
router.get('/', (req, res) => {
  Place
  .find()
  .then(places =>  {
    const availablePlaces = places.filter(({available}) => available === true)
    res.render('index', {loggedIn: req.user, availablePlaces}) 
  })
  .catch(err => console.log(err))
});



module.exports = router;