////////////////////
// REQUIREMENTS
////////////////////

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var key = process.env.YODA_KEY;
var request = require('request');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urbanyoda';
var port = process.env.PORT || 3000;

mongoose.connect(mongoUri);

////////////////////
// MIDDLEWARE
////////////////////

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

////////////////////
// CONTROLLERS
////////////////////

// ajax request to urban dictionary API with parameter passed from app.js
app.get('/getdata/:id', function(req, res){
  request({
    url: 'https://mashape-community-urban-dictionary.p.mashape.com/define?term='+req.params.id,
    method: 'GET',
    headers: {
      "X-Mashape-Key": key,
      "Accept": "text/plain"
    }
  }, function(error, response, body){
      res.send(body)
  });
});

// ajax request to yoda API using sentence parameter from app.js
app.get('/getdata2/:id', function(req, res){
  request({
    url: 'https://yoda.p.mashape.com/yoda?sentence='+req.params.id,
    method: 'GET',
    headers: {
      "X-Mashape-Key": key,
      "Accept": "text/plain"
    }
  }, function(error, response, body){
      res.send(body)
  });
});

var charactersController = require("./controllers/charactersController.js");
app.use("/characters", charactersController);

var seedController = require("./controllers/seedController");
app.use("/seed", seedController);

var favoriteController = require("./controllers/favoriteController");
app.use("/favorites", favoriteController);

////////////////////
// LISTEN
////////////////////

db.once('open', function(){
  app.listen(port, function(){
    console.log('====================');
    console.log('Running on Port: ' + port);
    console.log('====================');
  });
});
