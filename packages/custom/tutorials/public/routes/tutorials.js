'use strict';


/*
In der Config-Phase sind die selbst erstellten Services eines Moduls nicht verfügbar.
=> Sie können nicht per Dependency Injection injected werden.
Erst in der Run-Phase stehen die Servcies zur Verfügung.
Das heißt, die Methode 'isLoggedIn()' kann nicht in einem Service verpackt werden und 
muss in JEDEM Package neu deklariert werden.

Sowohl in der offiziellen Dokumenation als auch Im Forum, habe ich hierzu keine Lösung gefunden.
Dementsprechend kommt es an dieser Stelle zwangsweise zu Code-Duplikation.
*/
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

angular.module('mean.tutorials').config(['$stateProvider', 
  function($stateProvider) {
    $stateProvider.state('tutorials', {
      url: '/tutorials',
      templateUrl: 'tutorials/views/list.html',
      resolve: {
        loggedin: isLoggedIn
      }
    }).state('tutorials create', {
      url: '/tutorials/create',
      templateUrl: 'tutorials/views/create.html',
      resolve: {
        loggedin: isLoggedIn
      }
    }).state('tutorial', {
        url: '/tutorials/:tutorialId',
        templateUrl: 'tutorials/views/view.html',
        resolve: {
        loggedin: isLoggedIn
      }
      }).state('tutorial edit', {
        url: '/tutorials/:tutorialId/edit',
        templateUrl: 'tutorials/views/edit.html',
        resolve: {
        loggedin: isLoggedIn
      }
      }).state('error 404', {
        url: '/error/404',
        templateUrl: 'tutorials/views/error-404.html'
      }).state('error ', {
        url: '/error',
        templateUrl: 'tutorials/views/error.html'
      });
  }
]);
