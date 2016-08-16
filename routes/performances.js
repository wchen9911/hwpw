var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var performanceSchema = mongoose.Schema({
  name : String
});

var Performance = mongoose.model("Performance", performanceSchema);

// Gets all places
router.get('/', function(req, res, next) {
 
  Performance.find(function(err, performances) {
    if (err) return console.error(err);
    res.json(performances);
  });

});

// Gets a place
router.get('/:performance', function(req, res, next) {
  var performance = req.params.performance;
  res.json({performance: performance});
});

module.exports = router;
