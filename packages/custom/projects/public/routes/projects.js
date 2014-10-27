'use strict';

/*
Die Views...
quiz-create.html
questions-and-answers.html
exercises-create.html
...sind CHILD-States von 'projectcreate'.

Wenn einer dieser Child-States aktiv wird (bspw. durch Eingabe der URL),
werden diese Views in den View des Vater-States eingebettet.
Es ist wichtig, dass im View des Vaters '<div ui-view></div>' enthalten ist.
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

angular.module('mean.projects').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('projectcreate', {
      url: '/tutorials/:tutorialId/projects/create',
      templateUrl: 'projects/views/create.html',
      resolve: {
        loggedin: isLoggedIn
      }
     }).state('projectcreate.quizCreate', {
      url: '/quiz',
       templateUrl: 'projects/views/quiz-create.html',
       resolve: {
        loggedin: isLoggedIn
      }
     }).state('projectcreate.questionsCreate', {
       url: '/questions',
       templateUrl: 'projects/views/questions-and-answers-create.html',
       resolve: {
        loggedin: isLoggedIn
      }
     }).state('projectcreate.exercisesCreate', {
       url: '/exercises',
       templateUrl: 'projects/views/exercises-create.html',
       resolve: {
        loggedin: isLoggedIn
      }
     }).state('project', {
       url: '/tutorials/:tutorialId/projects/:projectId',
       templateUrl: 'projects/views/view.html',
       resolve: {
        loggedin: isLoggedIn
      }
     }).state('project.quiz', {
       url: '/quiz',
       templateUrl: 'projects/views/quiz-view.html',
       resolve: {
        loggedin: isLoggedIn
      }
     }).state('project.questions', {
       url: '/questions',
       templateUrl: 'projects/views/questions-and-answers-view.html',
       resolve: {
        loggedin: isLoggedIn
      }
     }).state('project.exercises', {
       url: '/exercises',
       templateUrl: 'projects/views/exercises-view.html',
       resolve: {
        loggedin: isLoggedIn
      }
     }).state('projects', {
       url: '/tutorials/:tutorialId/projects',
       templateUrl: 'projects/views/list.html',
       resolve: {
        loggedin: isLoggedIn
      }
     });
  }
]);
