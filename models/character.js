var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({

  name: String,
  image: String

});

var Character = mongoose.model('Character', characterSchema);
