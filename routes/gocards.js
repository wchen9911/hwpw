var express = require('express');
var models = require('../model/models')

var router = express.Router();
var GoCard = models.GoCard;
var Attraction = models.Attraction;

// Lists gocards by city.
router.get('/city/:city', function(req, res, next) {
  var city = req.params.city;
  GoCard.find({city: city}, function(err, cards) {
    if (err) return console.error(err);
    res.json(cards);
  });
});

module.exports = router;
