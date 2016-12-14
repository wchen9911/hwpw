var express = require('express');
var models = require('../model/models')

var router = express.Router();
var GoCard = models.GoCard;
var Attraction = models.Attraction;


// Get all the attractions belong to a gocard.
router.get('/gocard/:gocard', function(req, res, next) {
  var gocard = req.params.gocard;
  var result = {
    attractions: [],
    attractionsSale: []
  };
  GoCard.findOne({_id: gocard}, function(err, card) {
    if (err) return console.error(err);
    // Get all attractions.
    var promises = [];
    card.attractions && card.attractions.forEach(function(attraction) {
      var p = Attraction.findOne({_id: attraction}, function(err, attraction) {
        result.attractions.push(attraction);
      });
      promises.push(p);
    });
    card.attractionsSale && card.attractionsSale.forEach(function(attraction) {
      var p = Attraction.findOne({_id: attraction}, function(err, attraction) {
        result.attractionsSale.push(attraction);
      });
      promises.push(p);
    });

    Promise.all(promises).then(function() {
      res.json(result);
    });
  });
});

module.exports = router;
