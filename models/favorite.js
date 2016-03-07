var mongoose = require('mongoose');

var favoriteSchema = mongoose.Schema({

  body: String

});

var Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
