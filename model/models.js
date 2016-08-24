var mongoose = require('mongoose');


/**
 * Performer
 */
 /*
var performerSchema = mongoose.Schema({
  name: String, // Name
  ename: String, // English Name
  type: Number //1: fix, 2: recurring
});
var Performer = mongoose.model("Performer", performerSchema);
*/

/**
 * Location
 */
var LocationSchema = mongoose.Schema({
  name: String,
  map_img: String,
  map_json: String,
  city: String,
});
var Location = mongoose.model("location", LocationSchema);

/**
 * Performance
 */
 var performanceSchema = mongoose.Schema({
  name: String,
  icon: {type: String, default: 'assets/img/default.png'},
  performer: [String],
  location: String,
  date: String
});
var Performance = mongoose.model("performance", performanceSchema);


/**
 * Tickets
 */
 
var ticketSchema = mongoose.Schema({
  name: String,
  type: Number,
  performance: String,
  level: String,
  section: String,
  seat: [String],
  pack: [Number],
  price: Number,
  inventory: Number
});
var Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = {
	Location: Location,
	Performance: Performance,
//	Performer: Performer,
	Ticket: Ticket
};