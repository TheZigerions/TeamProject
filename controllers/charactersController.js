var express = require("express");

var router = express.Router();

var Character = require("../models/character.js");

var Favorite = require("../models/favorite.js");

router.get("/", function(req, res){
  Character.find(function(err, data){
    res.send(data);
  });
});

module.exports = router;
