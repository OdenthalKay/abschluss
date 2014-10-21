'use strict';

/*
Die Rückgabeobjekte von get, query sind ebenfalls Instanzen von 'Tutorials'.
Bei ihnen ist eldiglich das Property '$promise' definiert.
*/

angular.module('mean.tutorials').controller('TutorialsController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Tutorials', 'Comments',
  function($scope, $stateParams, $location, $http, Global, Tutorials, Comments) {
    $scope.global = Global;
    $scope.package = {
      name: 'tutorials'
    };
    $scope.name = '';

    $scope.findOne = function() {
      Tutorials.get({
        tutorialId: $stateParams.tutorialId
      }, function successCB(tutorial) {
        $scope.tutorial = tutorial;


        // Load Comments
  
      Comments.query({tutorialId:$stateParams.tutorialId}, function(comments) {
        $scope.comments = comments;
      });



      }, function errorCB(error) {
         // Es existiert kein Tutorial mit der ID
         // TODO: error-handler code verpacken
         if (error.status === 404) {
          $location.path('error/404');
        } else {
          $location.path('error');
        }
      }
      );
    };

    $scope.findAll = function() {
    	Tutorials.query(function(tutorials) {
    		$scope.tutorials = tutorials;
    	});
    };

    $scope.create = function() {
      console.log($scope.global.user);
      var tutorial = new Tutorials({
        name: $scope.name,
        slideshows: []
      });

      tutorial.$save(function(response) {
        // ID des neuen tutorials persistent im userDocument speichern
        //$scope.global.user.tutorialId = response._id;
        $http.put('/user/'+$scope.global.user._id,{tutID:response._id}).success(function(){
          });
        //$http.put('/user',{user:$scope.global.user}).success(function(){
          //});
        $location.path('tutorials/' + response._id);
      });
      $scope.name = '';
    };

    $scope.remove = function(tutorial) {
      tutorial.$remove({}, 
         function successCB() {
          $location.path('tutorials');
         }, function errorCB() {
         });    
    };

    $scope.update = function() {
      var tutorial = $scope.tutorial;
      tutorial.$update(function() {
        $location.path('tutorials/' + tutorial._id);
      });
    };
  }
  ]);
