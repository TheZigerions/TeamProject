var app = angular.module("TranslateApp", []);

app.controller("MainController",  ["$scope", function($scope){

  var controller = this;
  controller.myCharacter = "http://vignette2.wikia.nocookie.net/disney/images/9/95/Master_Yoda.png/revision/latest?cb=20151112212224";

  $scope.$on("ImageSend", function(eventObj, data){
    controller.myCharacter = data;
  });

  // declare sound clips
  var audioYoda = new Audio('/sounds/900yearsold.mp3');
  var audioChew = new Audio('/sounds/chewy_roar.mp3');
  var audioVader = new Audio('/sounds/vader.mp3');
  var audioLeia = new Audio('/sounds/nerfherder.mp3');
  var audioR2 = new Audio('/sounds/R2D2-yeah.mp3');

  // assign sound on click by image
  this.playSound = function(){
    if (this.myCharacter == 'http://vignette2.wikia.nocookie.net/disney/images/9/95/Master_Yoda.png/revision/latest?cb=20151112212224'){
      audioYoda.play();
    } else if (this.myCharacter == 'http://vignette3.wikia.nocookie.net/disney/images/d/da/TFA-Chewbacca-Fathead.png/revision/latest?cb=20160207022126'){
      audioChew.play();
    } else if (this.myCharacter == 'http://vignette3.wikia.nocookie.net/disney/images/d/df/Darth_Vader_Render.png/revision/latest?cb=20151222170300'){
      audioVader.play();
    } else if (this.myCharacter == 'http://vignette4.wikia.nocookie.net/disney/images/7/7f/Princess_Leia_render.png/revision/latest?cb=20151220170346'){
      audioLeia.play();
    } else if (this.myCharacter == 'http://vignette3.wikia.nocookie.net/disney/images/7/7c/R2-D2_Render.png/revision/latest?cb=20130314222826'){
      audioR2.play();
    };
  }; // -- end playSound function

}]); // -- end MainController

app.controller("ProfileController", ["$scope", "$http", function($scope, $http){

  var controller = this;

  $http({
    //grab characters from db 
    url: ("/characters"),
    method: "GET",
  }).then(
    function(response) {
      controller.character = response.data;
      //created function on change from select box
      controller.hasChanged = function(){
        //emit image to mainController
        $scope.$emit("ImageSend", this.myCharacter.image);
      };
    },
    function(){
      console.log("error");
    }
  );

}]); // -- end ProfileController

app.controller("FormController", ["$http", "$scope", function($http, $scope){

  // variables to toggle display of buttons and results
  this.showResult = false;
  this.showDifButton = false;
  this.showFavButton = false;
  this.urbanResult = null;
  this.showLoading = false;
  this.results = []; // -- storing urban dictionary results for recall on different definition of same word
  this.theWord = null; // -- to define word entry to pass into favorites model
  var controller = this;

  var randomNum = function(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
  };

  this.yodafy = function(){

    controller.showLoading = true;
    // declaring variable to pass through user entry as param in API call
    var text = this.word;
    controller.theWord = this.word;

    // ajax request to server which accesses urban API
    $http.get("/getdata/"+text).then(
      function(response){
        // bodyguard against word with no urban dictionary definition
        if (response.data.list.length < 1) {
          controller.showResult = true;
          controller.word = undefined;
          controller.showDifButton = false;
          controller.showFavButton = false;
          return controller.urbanResult = "Does not exist, this word. Error, you have made. Try again, you will."
        }
        var x = response.data.list.length;
        controller.results = []; // -- reset array of definitions for new word
        // loop to push definitions into results array
        for (var i=0; i < response.data.list.length; i++){
          controller.results.push(response.data.list[i].definition)
        }
        // pull random definition
        var urban = response.data.list[(randomNum(1, x) - 1)].definition;
        // ajax request to server with random definition that accesses yoda API
        $http.get("/getdata2/"+urban).then(
          function(result){
            // set result and display it via angular
            controller.urbanResult = result.data;
            controller.showResult = true;
            // display buttons
            controller.showDifButton = true;
            controller.showFavButton = true;
            controller.showLoading = false;
            // clear form
            controller.word = undefined;
          },
          function(){
            console.log("error");
          }
        )
      },
      function(){
        console.log("error");
      }
    );
  }; // -- end yodafy function

  this.newResult = function(){
    // accesses previously stored results array for new definition of same word
    var x = controller.results.length;
    var urban = controller.results[(randomNum(1, x) - 1)];

    $http.get("/getdata2/"+urban).then(
      function(response){
        controller.showFavButton = true;
        controller.urbanResult = response.data;
      },
      function(){
        console.log("error");
      }
    )
  }; // -- end newResult function

  // save favorites function
  this.saveFavorites = function(){
     var controller = this;
     var result = controller.urbanResult;
     var theWord = controller.theWord;
     $http({
       method: "POST",
       url: "/favorites/"+theWord+"/"+result,
       //header is undefined because not parsing formdata
       headers: {'Content-Type': 'undefined'}
     })
     .then(
       function(response){
        controller.showFavButton = false;
        //pushing newest favorite to page without refresh
        $scope.$$prevSibling.favCtrl.favorites.push(response.data);
       }, function(){
         console.log("error");
       }
     )
   }; // -- end saveFavorites function

}]); // -- end FormController

app.controller("FavoritesController", ["$http", function($http){

  var controller = this;
  //ajax call to grab all favorited results | ordered and limited in html
  $http({
    method: "GET",
    url: "/favorites",
  })
  .then(
    function(response){
      controller.favorites = response.data;
    },
      function(err){
      console.log(err);
    }
  );

}]); // -- end FavoritesController
