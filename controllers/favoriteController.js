var express = require("express");

var router = express.Router();

var Favorite = require("../models/favorite.js");

// var newFavorite = [
// 		{
// 			body: 'This is a definition',
//   		// date: ""
// 		}
// ];


router.get("/", function(req,res){

  Favorite.find({}, function(err, data){
		res.send(data);
	})

})


router.post("/:text", function(req, res) {
   var result = req.params.text;

   Favorite.create({}, {body: result}, function(err, data){
     res.send(data);
   });

});


module.exports = router;
