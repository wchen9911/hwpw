var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({a : 'a'});
});

router.get('/teams', function(req, res, next) {
	var db = req.db;

	var teams = db.get('nbaTeams');

	teams.find({},function(err, docs) {

		if( err ){
			console.log(err);
		}
		console.log( docs );
		res.json( docs );
	});

});

module.exports = router;
