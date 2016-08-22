var express = require('express');
var models = require('../model/models')

var router = express.Router();
var Ticket = models.Ticket;

// Gets all tickets
router.get('/', function(req, res, next) {
 
  Ticket.find(function(err, tickets) {
    if (err) return console.error(err);
    res.json(tickets);
  });

});

// Gets a ticket
router.get('/:ticketId', function(req, res, next) {
  var ticketId = req.params.ticketId;
  res.json({ticketId: ticketId});
});

// Gets a performance's tickets
router.get('/performance/:performanceId', function(req, res, next) {
  var performanceId = req.params.performanceId;
  Ticket.find({performance: performanceId}, function(err, tickets) {
    if (err) return console.error(err);
    res.json(tickets);
  });
});

module.exports = router;
