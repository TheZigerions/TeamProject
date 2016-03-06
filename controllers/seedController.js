var express = require('express');
var router = express.Router();

var Character = require('../models/character.js');


//SEED DATA

var newCharacter = [
		{
			name: 'Yoda',
  			image: 'TBD'
		}, {
			name: 'Chewbaca',
    	    img: 'TBD'
	  	}, {
			name: 'Leia',
    	    img: 'TBD'
	  	}, {
			name: 'Darth Vader',
    	    img: 'TBD'
	  	}, {
			name: 'R2D2',
	        img:'TBD'
		}
];


router.get('/', function(req, res) {
	Character.create(newCharacter, function(err) {
		if (err) {
			console.log(err);
			res.send('Error seeding database');
		} else {
			console.log('SEED EXECUTED');
			res.redirect('/')
		}
	});
});


module.exports = router;