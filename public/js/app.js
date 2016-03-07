var app = angular.module('TranslateApp', []);


app.controller("MainController",  ["$scope", function($scope){
  var controller = this;
  $scope.$on("Image", function(eventObj, image){
    controller.image = image;
    console.log("image received");
  })


}]);

app.controller("ProfileController", ["$scope", "$http", function($scope, $http){
 var controller = this;
  $http({
    url: ("/users"),
    method: "GET",
  }).then(
    function(response) {
      controller.character = response.data;
      console.log(controller.character.image);
      this.image = null;
      this.sendImage = function(){
        $scope.$emit("Image", this.data);
        console.log("image emitted");
      }
    }),
    function(){
      console.log("error");
    }

}]);

app.controller("FormController", ['$http', function($http){

  this.showResult = false;
  this.firstResult = null;
  this.secondResult = null;
  var controller = this;

  this.yodafy = function(){
    $http({
      url: 'https://mashape-community-urban-dictionary.p.mashape.com/define?term='+this.word,
      method: 'GET',
      headers: {
        "X-Mashape-Key": "",
        "Accept": "text/plain"
      }
    }).then(
      function(response){
        controller.firstResult = response.data.list[0].definition;
        $http({
          url: 'https://yoda.p.mashape.com/yoda?sentence='+controller.firstResult,
          method: 'GET',
          headers: {
            "X-Mashape-Key": "",
            "Accept": "text/plain"
          }
        }).then(
          function(result){
            controller.secondResult = result.data;
            controller.showResult = true;
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

}]); // -- end form controller
