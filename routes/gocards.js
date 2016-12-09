var express = require('express');
var models = require('../model/models')

var router = express.Router();
var GoCard = models.GoCard;

// Lists gocards by city.
router.get('/city/:city', function(req, res, next) {
  var city = req.params.city;
  GoCard.find({city: city}, function(err, cards) {
    if (err) return console.error(err);
    // Convert card's type from mongoose.model to Object, in order to 
    // append more information.
    cards = JSON.parse(JSON.stringify(cards));
    var promises = [];
    // Get each card's tickets' information.
    cards.forEach(function(card) {
      // Get each ticket's informaition.
      var p = Ticket.findOne({_id: card.ticket}, function(err, ticket) {
        if (err) return console.log(err);
        card.ticket = ticket;
      });
      promises.push(p);
    });
    Promise.all(promises).then(function() {
      res.json(cards);
    });
  });
});

module.exports = router;
