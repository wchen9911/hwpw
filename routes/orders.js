var express = require('express');
var router = express.Router();

const ORDERS_COLLECTION = "orders";

//get tickets
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
{
  cart : {},
  phone : ''  
} 
*
*/

router.post('/', function(req, res, next){
  
  var order = req.body;
  var db = req.db;
  var orders = db.get( ORDERS_COLLECTION );

  order.createTime = new Date();

  orders.insert( order ,function( err, doc ){
    if(err){
      res.send(err);
    }else{
      res.json(doc);
    }
  });

});

router.put('/', function(req, res, next) {

	var order = req.body;
  var db = req.db;

  var orders = db.get( ORDERS_COLLECTION );

  orders.findAndModify({
        "query": { "_id": orders.id(order) },
        "update": { 
            "$set": order
        }
    },
    { "new": true, "upsert": true },
    function(err,doc) {
        if (err) throw err;
        console.log( doc );
    }
  );

	res.send("OK");
});


module.exports = router;
