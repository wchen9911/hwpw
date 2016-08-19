var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var LocationSchema = mongoose.Schema({
  name: String,
  map: String,
  city: String,
});

var Location = mongoose.model("location", LocationSchema);

// Gets all performers
router.get('/', function(req, res, next) {
 
  Location.find(function(err, locations) {
    if (err) return console.error(err);
    res.json(locations);
  });

});

// Gets a performer
router.get('/:locationId', function(req, res, next) {
  var locationId = req.params.locationId;
  res.json({locationId: locationId});
});

module.exports = router;
