var express = require("express");

var router = express.Router();

var Favorite = require("../models/favorite.js");

var newFavorite = [
		{
			body: 'This is a definition',
  		// date: ""
		}
];


router.get("/", function(req,res){

  Favorite.create(newFavorite, function(err) {
		if (err) {
			console.log(err);
			res.send('Error seeding favorites');
		} else {
			console.log('FAV SEED EXECUTED');
			res.redirect('/')
		}
	});

})


router.post("/", function(req, res) {





});



module.exports = router;
