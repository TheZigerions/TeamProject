var mongoose = require('mongoose');
var Favorite = require('./favorite.js');

var userSchema = mongoose.Schema({

  name: String,
  over18: Boolean,
  favorites: [Favorite.schema]

});

var User = mongoose.model('User', userSchema);
module.exports = User;
