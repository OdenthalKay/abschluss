'use strict';

/*
Damit ein Kommentar mitsamt URL gespeichert werden kann, muss sie vor dem Route-Wechsel
gespeichert werden. Es gibt in AngularJS keine eifnache Möglichkeit, die zuletzt angesteuerte URL
ausfindig zu machen. Der 'Trick' liegt hier darin, dass EINMALIG ein Listener auf dem 
$rootScope registriert wird. 

Immer dann, wenn ein URL-Wechsel eingeleitet wird, muss dort die vorherige URL abgefragt werden.
Der $rootScope steht allen $scope-Variablen zur Verfügung. Es ist wichtig diesen Scope und nicht den eigenen zu verwenden,
da das Event '$locationChangeSuccess' erst beim VERLASSEN der Route '..../comments/create' aufgerufen wird.
Dies wäre allerdings zu spät, da wir die URL bereits beim BETRETEN benötigen, um sie mit abzuspeichern.
*/
angular.module('mean.comments').run( [ '$rootScope', '$state', function ($rootScope, $state) {
          $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){ 
            $rootScope.previousLocation = '#!'+$state.href(fromState, fromParams);
        });
}]);


angular.module('mean.comments').controller('CommentsController', ['$scope', '$rootScope', '$stateParams', '$location', 'Global', 'Comments',
  function($scope, $rootScope, $stateParams, $location, Global, Comments) {
    $scope.global = Global;
    $scope.package = {
      name: 'comments'
    };
    $scope.message = '';

   
    
     $scope.findOne = function() {
      Comments.get({
        commentId: $stateParams.commentId,
        tutorialId: $stateParams.tutorialId
      }, function(comment) {
        $scope.comment = comment;
      });
    };

    $scope.findAll = function() {
      Comments.query({tutorialId:$stateParams.tutorialId}, function(comments) {
        $scope.comments = comments;
      });
    };

    $scope.create = function() {
        var comment = new Comments({
          message: $scope.message,
          link: $rootScope.previousLocation
        });

        var tutorialId = $stateParams.tutorialId;
        comment.$save({tutorialId:tutorialId},function(response) {
          var path = 'tutorials/'+tutorialId+'/comments/' + response._id;

          $location.path(path);
        });

        $scope.message = '';
    };

  }
]);
