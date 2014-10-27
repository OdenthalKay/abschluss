'use strict';

    var isLoggedIn = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          alert('Sie sind nicht eingeloggt.');
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

angular.module('mean.comments').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('comments', {
      url: '/tutorials/:tutorialId/comments',
      templateUrl: 'comments/views/list.html',
      resolve: {
        loggedin: isLoggedIn
      }
    }).state('create comment', {
      // Der Path ist die URL, von der aus der Kommentar erstellt wird
      url: '/tutorials/:tutorialId/comments/create',
      templateUrl: 'comments/views/create.html',
      resolve: {
        loggedin: isLoggedIn
      }
    }).state('comment by Id', {
      url: '/tutorials/:tutorialId/comments/:commentId',
      templateUrl: 'comments/views/view.html',
      resolve: {
        loggedin: isLoggedIn
      }
    }).state('edit comment', {
      url: '/tutorials/:tutorialId/comments/:commentId/edit',
      templateUrl: 'comments/views/edit.html',
      resolve: {
        loggedin: isLoggedIn
      }
    });
  }
]);
