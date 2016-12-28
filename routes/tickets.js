var express = require('express');
var models = require('../model/models')

var router = express.Router();
var Ticket = models.Ticket;
var Performance = models.Performance;
var Promotion = models.Promotion;


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
  Ticket.findOne({_id: ticketId}, function(err, ticket) {
    if (err) {
      res.status(404).send("Not Found!").end();
      return console.error(err);
    }
    ticket = JSON.parse(JSON.stringify(ticket));
    var p = Performance.findOne({_id: ticket.performance}, function(err, performance) {
      if(err) return console.error(err);
      ticket.performanceInfo = performance;
    });
    p.then(function(){
      res.json(ticket);
    },function(){
      res.json({});
    });
  });
});

// Gets a performance's tickets
router.get('/performance/:performanceId', function(req, res, next) {
  var performanceId = req.params.performanceId;
  Ticket.find({performance: performanceId}, function(err, tickets) {
    if (err) return console.error(err);
    tickets = JSON.parse(JSON.stringify(tickets));
    var promises = [];
    tickets.forEach(function(ticket) {
      ticket.promotions && ticket.promotions.forEach(function(promotion, index) {
        var p = Promotion.findOne({_id: promotion},  function(err, promotion) {
          if (err) return console.error(err);
          ticket.promotions[index] = promotion;
        });
        promises.push(p);
      });
    });
    Promise.all(promises).then(function() {
      res.json(tickets);
    });
  });
});

module.exports = router;
