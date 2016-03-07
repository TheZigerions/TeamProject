var app = angular.module('TranslateApp', []);


app.controller("MainController", function(){

});


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
