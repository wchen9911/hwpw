var express = require('express');
var models = require('../model/models')

var router = express.Router();
var City = models.City;

// Lists cities.
router.get('/', function(req, res, next) {
  var query = req.query;
  var productions = (query.production || '').split(',');
  City.find({production: productions}).sort('-rank').exec(function(err, cities) {
    if (err) return console.error(err);
    res.json(cities);
  });
});

module.exports = router;
