var express = require('express');
var router = express.Router();

const ALCATRAZ_TICKET_COLLECTION = "alcatrazTicket";

//get tickets
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/year/:year/month/:month/day/:day', function(req, res, next) {

  var db = req.db;
  var alcatrazTicket = db.get( ALCATRAZ_TICKET_COLLECTION );
  req.params.month = req.params.month - 1;
  var firstDate = new Date( Date.UTC( req.params.year, req.params.month, req.params.day) );

  alcatrazTicket.find({
    date : {
      $gte : firstDate
    }
  },function(err, docs){
    res.json(docs);
  });  

});

/*
 * put tickets data
 * [
 * 	{
 * 	 year : '',
 *   month : '',
 *   day : '',
 *   hour : '',
 *   minute : '',
 *   second : '',
 * 	 avalible: '',
 * 	 id: '',
 * 	},
 * 	{...}
 * ]
 */
router.put('/', function(req, res, next) {

	var tickets = req.body;
  var db = req.db;

  if( Array.isArray(tickets) ){

    tickets.forEach(function(ticket){
      saveTicket(db, ticket)
    });

  }else{
    saveTicket(db, tickets);
  }

	res.send("OK");
});

function saveTicket( db, ticket ){

  var obj = ticket;

  obj.date = new Date( Date.UTC( obj.year, obj.month-1, obj.day, obj.hour, obj.minute, obj.second) );

  var alcatrazTicket = db.get( ALCATRAZ_TICKET_COLLECTION );

  delete obj.year;
  delete obj.month;
  delete obj.day;
  delete obj.hour;
  delete obj.minute;
  delete obj.second;

  alcatrazTicket.findAndModify({
        "query": { "date": obj.date },
        "update": { 
            "$set": obj
        }
    },
    { "new": true, "upsert": true },
    function(err,doc) {
        if (err) throw err;
        console.log( doc );
    }
  );

}

module.exports = router;
