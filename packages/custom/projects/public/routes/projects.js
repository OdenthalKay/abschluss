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

angular.module('mean.projects').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('projectcreate', {
      url: '/tutorials/:tutorialId/projects/create',
      templateUrl: 'projects/views/create.html'
     }).state('projectcreate.quizCreate', {
      url: '/quiz',
       templateUrl: 'projects/views/quiz-create.html'
     }).state('projectcreate.questionsCreate', {
       url: '/questions',
       templateUrl: 'projects/views/questions-and-answers-create.html'
     }).state('projectcreate.exercisesCreate', {
       url: '/exercises',
       templateUrl: 'projects/views/exercises-create.html'
     }).state('project', {
       url: '/tutorials/:tutorialId/projects/:projectId',
       templateUrl: 'projects/views/view.html'
     }).state('project.quiz', {
       url: '/quiz',
       templateUrl: 'projects/views/quiz-view.html'
     }).state('project.questions', {
       url: '/questions',
       templateUrl: 'projects/views/questions-and-answers-view.html'
     }).state('project.exercises', {
       url: '/exercises',
       templateUrl: 'projects/views/exercises-view.html'
     }).state('projects', {
       url: '/tutorials/:tutorialId/projects',
       templateUrl: 'projects/views/list.html'
     });
  }
]);
