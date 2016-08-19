var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();


var ticketSchema = mongoose.Schema({
  name: String,
  price: Number,
  inventory: Number,
  minpackage: {type: Number, default: 1},
  performance: String
});

var Ticket = mongoose.model("Ticket", ticketSchema);

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
