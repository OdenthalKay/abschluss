'use strict';


/*
ACHTUNG:
Auf der Client-Seite müssen immer ALLE Parameter der URL aufgelöst werden.
Egal welche Methode (GET, UPDATE, POST, DELETE) angewendet wird.

Auf der Server-Seite werden die Parameter nur noch AUSGEWERTET!
=> über '$stateParams' immer zuvor alle Parameter identifizieren:
Bsp.: query({tutorialId:$stateParams.tutorialId}, cb);
*/


angular.module('mean.slideshows').controller('SlideshowsController', ['$scope', '$stateParams', '$location', 'Global', 'Slideshows', 'TutorialOwner',
  function($scope, $stateParams, $location, Global, Slideshows, TutorialOwner) {
    $scope.global = Global;
    $scope.package = {
      name: 'slideshows'
    };
    $scope.name = '';

      $scope.init = function() {
      if (!TutorialOwner.isOwner($scope.global.user, $stateParams.tutorialId)) {
        alert('Dies ist nicht ihr Tutorial. Sie können den Namen dieser Slideshow nicht editieren.');
        var path = 'tutorials/'+$stateParams.tutorialId+'/slideshows/' + $stateParams.slideshowId;
        $location.path(path);
      } else {
        $scope.findOne();
      }
    };

  

      $scope.findOne = function() {
      Slideshows.get({
        slideshowId: $stateParams.slideshowId,
        tutorialId: $stateParams.tutorialId
      }, function(slideshow) {
        $scope.slideshow = slideshow;
      });
    };

    $scope.findAll = function() {
    	Slideshows.query({tutorialId:$stateParams.tutorialId}, function(slideshows) {
    		$scope.slideshows = slideshows;
    	});
    };

    $scope.create = function() {
        var slideshow = new Slideshows({
          name: $scope.name
        });

        var tutorialId = $stateParams.tutorialId;
        slideshow.$save({tutorialId:tutorialId},function(response) {
          var path = 'tutorials/'+tutorialId+'/slideshows/' + response._id;
          $location.path(path);
        });

        $scope.name = '';
    };


    $scope.remove = function(slideshow) {
        var tutorialId = $stateParams.tutorialId;

        slideshow.$remove({tutorialId:tutorialId}, 
           function successCB() {
           var path = 'tutorials/'+tutorialId+'/slideshows';
           $location.path(path);
        }, function errorCB() {
        });

    };

    $scope.update = function() {
      var tutorialId = $stateParams.tutorialId;
      var slideshow = $scope.slideshow;
      slideshow.$update({tutorialId:tutorialId}, function() {
        var path = 'tutorials/'+tutorialId+'/slideshows/' + slideshow._id;
        $location.path(path);
      });
    };

  }
]);
