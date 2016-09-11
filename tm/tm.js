var Client = require('node-rest-client').Client;
var webconfig = require('../webconfig');
var fs = require('fs');
var models = require('../model/models')
var mongoose = require('mongoose');

//mongodb
var mongodbConnectURL = 'mongodb://';
if (webconfig.mongodb.username && webconfig.mongodb.password) {
  mongodbConnectURL += webconfig.mongodb.username;
  mongodbConnectURL += ':';
  mongodbConnectURL += webconfig.mongodb.password + '@';
}
mongodbConnectURL += webconfig.mongodb.host+':';
mongodbConnectURL += webconfig.mongodb.port+'/';
mongodbConnectURL += webconfig.mongodb.database;
//mongoose
mongoose.connect(mongodbConnectURL);


var Performance = models.Performance;
var Performer = models.Performer;
var Location = models.Location;



/*
var client = new Client();

console.log(webconfig.tm);

var args = {
  path: {'key': webconfig.tm.consumerKey}
};

// get all games

client.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&page=1&size=500&sort=date,asc&classificationName=NBA', args, function(data, response) {

  console.log(data);
});
*/

var obj = JSON.parse(fs.readFileSync('../events.json', 'utf8'));

var parseEventsList = function(data) {

  var events = data._embedded && data._embedded.events || [];

  events.forEach(function(event) {
    
    var promises = [];

    // Performers
    var hwpwPerformers = [];
    var attractions = event._embedded.attractions;
    attractions.forEach(function(attraction) {
      var a = {};
      a.name = attraction.name;
      a.id = attraction.id;

      var promise = Performer.findOne({tmid: a.id}, function(err, data) {
        if (data) {
          hwpwPerformers.push(data._id);
        } else {
          //console.log('TMID performer ' + a.id);
          //console.log('Unfound performer ' + a.name);
        } 
      });
      promises.push(promise);
    });

    // Location
    // 
    var locations = event._embedded.venues;
    var location = locations[0];

    var hwpwLocationId = '';
    var p = Location.findOne({tmid: location.id}).then(function(data) {
      if (data) {
        hwpwLocationId = data._id;
      }
    });
    promises.push(p);

    Promise.all(promises).then(function() {

      var obj = {
        name: event.name,
        ename: event.name,
        date: event.dates.start.localDate + ' ' + event.dates.start.localTime,
        tmid: event.id,
        performer: hwpwPerformers,
        location: hwpwLocationId
      };

      Performance.findOne({tmid: obj.tmid}).then(function(data) {
        if (!data) {
          console.log('Insert a new Event');
          console.log(obj);
          var p = new Performance(obj);
          p.save(function(err) {
            if (err) console.log(err);
          });  
        }
      });
    });    
  });
};

var parseLocation = function(data) {

  var events = data._embedded && data._embedded.events || [];

  // Because Moongoose is async, I have to do like this. I hope I can find a way to call
  // Sync later.
  var locationMap = {};
  var allLocations = [];

  events.forEach(function(event) {
    var locations = event._embedded.venues;
    var location = locations[0];
    if (!locationMap[location.id]) {
      locationMap[location.id] = true;
      allLocations.push(location);
    }
  });

  allLocations.forEach(function(location) {

    var obj = {
      tmid: location.id,
      ename: location.name,
      ecity: location.city.name,
      estate: (location.state && location.state.name) || '',
      statecode: (location.state && location.state.stateCode) || '',
      zip: location.postalCode,
      address: location.address.line1
    };

    Location.findOne({tmid: obj.tmid}).then(function(data) {
      if (!data) {
        var location = new Location(obj);
        location.save(function(err) {
          if (err) console.log('Error ' + err);
        });
      }
    });
  });

};

parseEventsList(obj);

//parseLocation(obj);

//mongoose.disconnect();
