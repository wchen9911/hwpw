var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();


var performerSchema = mongoose.Schema({
  name: String, // Name
  ename: String, // English Name
  type: Number //1: fix, 2: recurring
});

var Performer = mongoose.model("Performer", performerSchema);

// Gets all performers
router.get('/', function(req, res, next) {
 
  Performer.find(function(err, performers) {
    if (err) return console.error(err);
    res.json(performers);
  });

});

// Gets a performer
router.get('/:performer', function(req, res, next) {
  var performer = req.params.performer;
  res.json({performer: performer});
});

module.exports = router;
