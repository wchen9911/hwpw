var mongoose = require('mongoose');


/**
 * Performer
 */
 
var performerSchema = mongoose.Schema({
  name: String, // Name
  ename: String, // English Name
  type: Number //1: fix, 2: recurring
});
var Performer = mongoose.model("Performer", performerSchema);

/**
 * Location
 */
var LocationSchema = mongoose.Schema({
  name: String,
  city: String,
  state: String,
  tmid: String,
  ename: String,
  ecity: String,
  estate: String,
  statecode: String,
  zip: String,
  address: String,
  map_img: String,
  map_json: String
});
var Location = mongoose.model("location", LocationSchema);

/**
 * Performance
 */
 var performanceSchema = mongoose.Schema({
  name: String,
  ename: String,
  tmid: String,
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


/**
 * Feedbacks
 */
var feedbackSchema = mongoose.Schema({
  contact: String,
  content: String
});
var Feedback = mongoose.model("Feedback", feedbackSchema);


/**
 * City.
 */
 var citySchema = mongoose.Schema({
  name: String,
  ename: String,
  state: String,
  estate: String,
  thumbnail: String,
  production: [String]
 });
 var City = mongoose.model("City", citySchema, 'cities');


 /**
  * GoCard.
  */
var goCardSchema = mongoose.Schema({
  name: String,
  ctiy: String,
  ticket: String,
  attractions: [String],
  attractionsSale: [String]
});
var GoCard = mongoose.model("GoCard", goCardSchema);

/**
 * Attraction.
 */ 
var attractionSchema = mongoose.Schema({
  name: String,
  ename: String,
  city: String,
  pictures: [String],
  info: String,
  price: Number
});
var Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = {
  Location: Location,
  Performance: Performance,
  Performer: Performer,
  Ticket: Ticket,
  Feedback: Feedback,
  City: City,
  GoCard: GoCard,
  Attraction: Attraction
};
