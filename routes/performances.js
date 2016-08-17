var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var performanceSchema = mongoose.Schema({
  name: String,
  performer: [String],
  location: String,
  date: Date
});

var Performance = mongoose.model("performance", performanceSchema);

// Gets all places
router.get('/', function(req, res, next) {
  Performance.find(function(err, performance) {
    if (err) return console.error(err);
    res.json(performance);
  });
});

// Gets a place
router.get('/:performanceId', function(req, res, next) {
  var performanceId = req.params.performanceId;
  Performance.find({_id: performanceId},function(err, performance) {
    if (err) return console.error(err);
    res.json(performance);
  });
});

// Gets a perfomer's performance
router.get('/performer/:performerId', function(req, res, next) {
  var performerId = req.params.performerId;
 
  Performance.find({performer: performerId}, function(err, performances) {
    if (err) return console.error(err);
    res.json(performances);
  });

});

module.exports = router;
