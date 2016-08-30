var express = require('express');
var models = require('../model/models')

var router = express.Router();

var Performer = models.Performer;

// Gets all performers
router.get('/group/:group', function(req, res, next) {
  var group = req.params.group;
  Performer.find({group: group}, function(err, performers) {
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
