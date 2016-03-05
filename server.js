////////////////////
// REQUIREMENTS
////////////////////

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var port = process.env.PORT || 3000;

////////////////////
// MIDDLEWARE
////////////////////

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

////////////////////
// CONTROLLERS
////////////////////



var usersController = require("./controllers/usersController.js");
app.use("/users", usersController);






////////////////////
// LISTEN
////////////////////

mongoose.connect('mongodb://localhost:27017/urbanyoda');

db.once('open', function(){
  app.listen(port, function(){
    console.log('====================');
    console.log('Running on Port: ' + port);
    console.log('====================');
  });
});
