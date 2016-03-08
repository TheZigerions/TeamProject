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
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/urbanyoda');

////////////////////
// MIDDLEWARE
////////////////////

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

////////////////////
// CONTROLLERS
////////////////////

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

var usersController = require("./controllers/usersController.js");
app.use("/users", usersController);

var seedController = require('./controllers/seedController');
app.use('/seed', seedController);

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
