'use strict';

/*
Die Rückgabeobjekte von get, query sind ebenfalls Instanzen von 'Tutorials'.
Bei ihnen ist eldiglich das Property '$promise' definiert.
*/

angular.module('mean.tutorials').controller('TutorialsController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Tutorials', 'Comments', 'TutorialOwner',
  function($scope, $stateParams, $location, $http, Global, Tutorials, Comments, TutorialOwner) {
    $scope.global = Global;
    $scope.package = {
      name: 'tutorials'
    };
    $scope.name = '';


    /*
    Der User muss jedes Mal geladen werden, wenn die Tutorials angezeigt werden,
    damit sichergestellt ist, dass alle Daten aktuell sind.
    */
    $scope.loadUser = function() {
      $http.get('/users/me').success(function(data, status, headers, config) {
            $scope.global.user = data;
          });
      };

    $scope.init = function() {
      if (!TutorialOwner.isOwner($scope.global.user, $stateParams.tutorialId)) {
        alert('Dies ist nicht ihr Tutorial. Sie können dieses Tutorial nicht editieren.');
        $location.path('tutorials');
      } else {
        $scope.findOne();
      }
    };

    $scope.findOne = function() {
      $scope.loadUser();
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
      $scope.loadUser();
    	Tutorials.query(function(tutorials) {
    		$scope.tutorials = tutorials;
    	});
    };

    $scope.create = function() {
      var tutorial = new Tutorials({
        name: $scope.name,
        slideshows: []
      });

      tutorial.$save(function(response) {
        $http.put('/user/'+$scope.global.user._id,{tutID:response._id}).success(function(){
            $location.path('tutorials/'+response._id);
          });
        $scope.name = '';

      });
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

    /*
    Wenn in der Tutorial-Liste der Link eines Tutorials angeglickt wird,
    präsentiert diese Methode dem Nutzer das korrekte Tutorial
    */
    $scope.showTutorial = function(id) {
      $location.path('tutorials/'+id);
    };

    $scope.showSlideshowCreateView = function(tutorialId) {
      $location.path('tutorials/'+tutorialId+'/slideshows/create');
    };

      $scope.showProjectCreateView = function(tutorialId) {
      $location.path('tutorials/'+tutorialId+'/projects/create');
    };




    $scope.isTutorialOwner = function(id) {
      var isOwner = TutorialOwner.isOwner($scope.global.user, id);
      //var isOwner = TutorialOwner.isOwner($scope.global.user, $stateParams.tutorialId);
      return isOwner;
    };






  }
  ]);
