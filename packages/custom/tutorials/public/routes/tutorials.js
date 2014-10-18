'use strict';

angular.module('mean.tutorials').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('tutorials', {
      url: '/tutorials',
      templateUrl: 'tutorials/views/list.html'
    }).state('tutorials create', {
      url: '/tutorials/create',
      templateUrl: 'tutorials/views/create.html'
    }).state('tutorial', {
        url: '/tutorials/:tutorialId',
        templateUrl: 'tutorials/views/view.html'
      }).state('tutorial edit', {
        url: '/tutorials/:tutorialId/edit',
        templateUrl: 'tutorials/views/edit.html'
      }).state('error 404', {
        url: '/error/404',
        templateUrl: 'tutorials/views/error-404.html'
      }).state('error ', {
        url: '/error',
        templateUrl: 'tutorials/views/error.html'
      });
  }
]);
