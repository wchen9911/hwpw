var express = require('express');
var models = require('../model/models')

var router = express.Router();
var Location = models.Location;


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
  Location.findOne({_id: locationId}, function(err, doc) {
  	if (err) return;
  	res.json(doc);
  });
});

module.exports = router;
