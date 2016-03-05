var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

  name: String,
  over18: Boolean,
  favorites: []

});

var User = mongoose.model('User', userSchema);
