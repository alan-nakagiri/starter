var mongoose = require('mongoose');
var appconfig = require('./../appconfig');

// mongoose.connect('mongodb://'+appconfig.mongoID+':'+appconfig.mongoPW+'@ds049925.mongolab.com:49925/localbrewguide');
mongoose.connect('mongodb://localhost/startMongo');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// function seedData() {
//   BreweryItem.count({}, function(error, count) {
//     if (error) { throw error; }
//
//     if (count === 0) {
//       console.log("seeding data...");
//       const breweries = [{
//         name: "Local Brewing Co."
//       }, {
//         name: "21st Amendment"
//       }];
//       breweries.forEach(function(brewery) {
//         BreweryItem.create(brewery, function(error){
//           if (error) { console.error(error); }
//         });
//       });
//     }
//   });
// }

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function() {
  console.log("connection to database established.");
  // seedData();
});
