var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();


var placeSchema = mongoose.Schema({
  name : String
});

var Place = mongoose.model("Place", placeSchema);

// Gets all places
router.get('/', function(req, res, next) {
 
  Place.find(function(err, places) {
    if (err) return console.error(err);
    res.json(places);
  });

});

// Gets a place
router.get('/:place', function(req, res, next) {
  var place = req.params.place;
  res.json({place: place});
});

module.exports = router;
