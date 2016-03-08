var express = require("express");

var router = express.Router();

var Character = require('../models/character.js');

router.get("/", function(req, res){

  Character.find(function(err, data){
    console.log("this is the data");
    res.send(data);
    // console.log(data);
  });


});



router.post("/", function(req, res) {

  



});




module.exports = router;
