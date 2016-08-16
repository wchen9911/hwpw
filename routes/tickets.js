var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();


var ticketSchema = mongoose.Schema({
  name: String,
  price: Number,
  inventory: Number,
  performance: String
});

var Ticket = mongoose.model("Ticket", ticketSchema);

// Gets all performers
router.get('/', function(req, res, next) {
 
  Ticket.find(function(err, tickets) {
    if (err) return console.error(err);
    res.json(tickets);
  });

});

// Gets a performer
router.get('/:ticket', function(req, res, next) {
  var ticket = req.params.ticket;
  res.json({ticket: ticket});
});

module.exports = router;
