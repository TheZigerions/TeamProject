var express = require('express');
var router = express.Router();

var Character = require('../models/character.js');


//SEED DATA

var newCharacter = [
		{
			name: 'Yoda',
  		image: 'http://vignette2.wikia.nocookie.net/disney/images/9/95/Master_Yoda.png/revision/latest?cb=20151112212224'
		}, {
			name: 'Chewbacca',
    	image: 'http://vignette3.wikia.nocookie.net/disney/images/d/da/TFA-Chewbacca-Fathead.png/revision/latest?cb=20160207022126'
	  }, {
			name: 'Leia',
    	image: 'http://vignette4.wikia.nocookie.net/disney/images/7/7f/Princess_Leia_render.png/revision/latest?cb=20151220170346'
	  }, {
			name: 'Darth Vader',
    	image: 'http://vignette3.wikia.nocookie.net/disney/images/d/df/Darth_Vader_Render.png/revision/latest?cb=20151222170300'
	  }, {
			name: 'R2D2',
	    image:'http://vignette3.wikia.nocookie.net/disney/images/7/7c/R2-D2_Render.png/revision/latest?cb=20130314222826'
		}, {
			name: 'BB8',
			image: 'http://vignette1.wikia.nocookie.net/disney/images/8/89/BB-8Fathead.png/revision/latest/scale-to-width-down/2000?cb=20151201015245'
		}, {
			name: 'Rey',
			image: 'http://vignette4.wikia.nocookie.net/disney/images/d/dd/Rey_Figure.png/revision/latest?cb=20151211100722'
		}
];

//Seed function a la Thom
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
