var express = require('express');
var models = require('../model/models')

var router = express.Router();

var Performance = models.Performance;
var Ticket = models.Ticket;
var Location = models.Location;

// Gets all places
router.get('/', function(req, res, next) {
  Performance.find(function(err, performance) {
    if (err) return console.error(err);
    res.json(performance);
  });
});

// Gets a performance detail
router.get('/:performanceId', function(req, res, next) {
  var performanceId = req.params.performanceId;
  Performance.findOne({_id: performanceId},function(err, performance) {
    if (err) return console.error(err);
    performance = JSON.parse(JSON.stringify(performance));
    var p = Location.findOne({_id: performance.location}, function(err, doc) {
        if (err) return;
        performance.locationInfo = doc;
    });
    p.then(function() {
      res.json(performance);
    });
  });
});

// Gets a perfomer's performance
router.get('/performer/:performerId', function(req, res, next) {
  var performerId = req.params.performerId;
 
  Performance.find({performer: performerId}, function(err, performances) {
    if (err) return console.error(err);
    // In order to add temporary properties, we need to convert
    performances = JSON.parse(JSON.stringify(performances));
    var promises = [];
    performances.forEach(function(performance, index) {
      // Get the lowest price 
      var p = Ticket.findOne({performance: performance._id}).sort('price').exec(function(err, doc){
        if (err) return;
        performance.price = doc && doc.price ? doc.price : 0;
      });
      promises.push(p);
      // Get Location detail
      p = Location.findOne({_id: performance.location}, function(err, doc) {
        if (err) return;
        performance.locationInfo = doc;
      });
      promises.push(p);
    });
    Promise.all(promises).then(function() {
      res.json(performances);
    });
  });
});

module.exports = router;
