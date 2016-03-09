var app = angular.module('TranslateApp', []);


app.controller("MainController",  ["$scope", function($scope){
  var controller = this;

  controller.myCharacter = 'http://vignette2.wikia.nocookie.net/disney/images/9/95/Master_Yoda.png/revision/latest?cb=20151112212224';
  $scope.$on("ImageSend", function(eventObj, data){
    // console.log(data);
    controller.myCharacter = data;
    // console.log("image received");
  });


}]);

app.controller("ProfileController", ["$scope", "$http", function($scope, $http){

this.showWelcome = true;
 var controller = this;
  $http({
    url: ("/users"),
    method: "GET",
  }).then(
    function(response) {
      controller.character = response.data;
      // console.log(response.data);
      this.showWelcome = false;
      controller.hasChanged = function(){
        $scope.$emit("ImageSend", this.myCharacter.image);
        // console.log(this.myCharacter.image);
        // console.log("changed")
      }
    }),
    function(){
      console.log("error");
    }


}]);

app.controller("FormController", ['$http', "$scope", function($http, $scope){

  this.showResult = false;
  this.showButton = false;
  this.urbanResult = null;
  this.showLoading = false;
  this.results = [];
  this.theWord = null;
  var controller = this;

  var randomNum = function(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
  };
  this.yodafy = function(){
    controller.showLoading = true;

    var text = this.word;
    controller.theWord = this.word;
    $http.get('/getdata/'+text).then(
      function(response){
        if (response.data.list.length < 1) {
          controller.showResult = true;
          controller.word = undefined;
          controller.showButton = false;
          return controller.urbanResult = 'Does not exist, this word. Error, you have made. Try again, you will.'
        }
        var x = response.data.list.length;
        controller.results = [];
        for (var i=0; i < response.data.list.length; i++){
          controller.results.push(response.data.list[i].definition)
        }
        var urban = response.data.list[(randomNum(1, x) - 1)].definition;
        $http.get('/getdata2/'+urban).then(
          function(result){
            controller.urbanResult = result.data;
            controller.showResult = true;
            controller.showButton = true;
            controller.showLoading = false;
            controller.word = undefined;
          },
          function(){
            console.log(err);
          }
        )
      },
      function(){
        console.log(err);
      }
    );
  }; // -- end yodafy function
  this.newResult = function(){
    var x = controller.results.length;
    var urban = controller.results[(randomNum(1, x) - 1)];
    $http.get('/getdata2/'+urban).then(
      function(response){
        controller.urbanResult = response.data;
      },
      function(){
        console.log(err);
      }
    )
  }; // -- end newResult function

  //save favorites function
  this.saveFavorites = function(){
     var controller = this;
     var result = controller.urbanResult;
     console.log(controller.theWord);
     var theWord = controller.theWord;
     $http({
       method: "POST",
       url: "/favorites/"+theWord+"/"+result,
       headers: {'Content-Type': 'undefined'}
     })
     .then(
       function(response){
        //  console.log(response.data.body);
        //  console.log($scope);
        //  console.log($scope.$$nextSibling.favCtrl.favorites);
        console.log(response.data);
         $scope.$$nextSibling.favCtrl.favorites.push(response.data);
       }
     ), function(err){
       console.log("error");
     }
   };


}]); // -- end form controller


app.controller("FavoritesController", ["$http", function($http){
  var controller = this;
  $http({
    method: "GET",
    url: "/favorites",
  })
  .then(
    function(response){
      console.log(response.data);
      controller.favorites = response.data;
    }
  ),
    function(err){
    console.log(error);
  }





}]);
