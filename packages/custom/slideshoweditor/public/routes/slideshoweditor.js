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

angular.module('mean.slideshoweditor').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('slideshoweditor', {
      url: '/slideshoweditor',
      templateUrl: 'slideshoweditor/views/index.html',
      resolve: {
        loggedin: isLoggedIn
      }
    }).state('slideshows create', {
      url: '/tutorials/:tutorialId/slideshows/create',
      templateUrl: 'slideshoweditor/views/index.html',
      resolve: {
        loggedin: isLoggedIn
      }
    });
  }
]);
