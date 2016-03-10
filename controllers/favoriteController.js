var express = require("express");

var router = express.Router();

var Favorite = require("../models/favorite.js");

router.get("/", function(req,res){
  Favorite.find({}, function(err, data){
		res.send(data);
	});
});

router.post("/:id/:text", function(req, res) {
	//passing through parameter for word and result body
   var result = req.params.text;
   var word = req.params.id;
   Favorite.create({name: word, body: result}, function(err, data){
     res.send(data);
   });
});

module.exports = router;
