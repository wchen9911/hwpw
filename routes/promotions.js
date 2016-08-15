var express = require('express');
var router = express.Router();

const PROMOTION_COLLECTION = "promotion";

//get tickets
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/group/:group' ,function(req, res, next){

  var db = req.db;
  var group = req.params.group;
  var promotions = db.get( PROMOTION_COLLECTION );

  promotions.find({
    group : parseInt(group)
  }, function(err, docs){
    res.json(docs);
  });

});

module.exports = router;
