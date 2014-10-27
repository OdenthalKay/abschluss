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

angular.module('mean.slideshows').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('slideshows', {
      url: '/tutorials/:tutorialId/slideshows',
      templateUrl: 'slideshows/views/list.html',
      resolve: {
        loggedin: isLoggedIn
      }
    }).state('slideshow edit', {
    	// Nur Name editierbar
        url: '/tutorials/:tutorialId/slideshows/:slideshowId/edit',
        templateUrl: 'slideshows/views/edit.html',
        resolve: {
        loggedin: isLoggedIn
      }
      });
  }
]);



