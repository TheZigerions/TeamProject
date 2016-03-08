var mongoose = require('mongoose');

var favoriteSchema = mongoose.Schema({

  body: String,
  date: {type: Date, default: Date.now}

});

var Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
