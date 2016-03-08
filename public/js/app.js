var app = angular.module('TranslateApp', []);


app.controller("MainController",  ["$scope", function($scope){
  var controller = this;
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

app.controller("FormController", ['$http', function($http){

  this.showResult = false;
  this.firstResult = null;
  this.secondResult = null;
  var controller = this;

  this.yodafy = function(){
    console.log(controller.word);

    $http({
      url: "/favorites",
      method: "POST"
    })

  }


  //   $http({
  //     url: 'https://mashape-community-urban-dictionary.p.mashape.com/define?term='+this.word,
  //     method: 'GET',
  //     headers: {
  //       "X-Mashape-Key": "",
  //       "Accept": "text/plain"
  //     }
  //   }).then(
  //     function(response){
  //       controller.firstResult = response.data.list[0].definition;
  //       $http({
  //         url: 'https://yoda.p.mashape.com/yoda?sentence='+controller.firstResult,
  //         method: 'GET',
  //         headers: {
  //           "X-Mashape-Key": "",
  //           "Accept": "text/plain"
  //         }
  //       }).then(
  //         function(result){
  //           controller.secondResult = result.data;
  //           controller.showResult = true;
  //           controller.word = undefined;
  //         },
  //         function(){
  //           console.log(err);
  //         }
  //       )
  //     },
  //     function(){
  //       console.log(err);
  //     }
  //   );
  // }; // -- end yodafy function

}]); // -- end form controller
