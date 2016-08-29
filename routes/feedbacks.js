var express = require('express');
var models = require('../model/models')

var router = express.Router();
var Feedback = models.Feedback;

// Gets a ticket
router.post('/', function(req, res, next) {
  var feedback = new Feedback(req.body);
  feedback.save(function(err) {
    if (err) {
      res.status(502).send("error").end();
      return console.error(err);
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
