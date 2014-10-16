'use strict';

angular.module('mean.comments').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('comments', {
      url: '/tutorials/:tutorialId/comments',
      templateUrl: 'comments/views/list.html'
    }).state('create comment', {
      // Der Path ist die URL, von der aus der Kommentar erstellt wird
      url: '/tutorials/:tutorialId/comments/create',
      templateUrl: 'comments/views/create.html'
    }).state('comment by Id', {
      url: '/tutorials/:tutorialId/comments/:commentId',
      templateUrl: 'comments/views/view.html'
    }).state('edit comment', {
      url: '/tutorials/:tutorialId/comments/:commentId/edit',
      templateUrl: 'comments/views/edit.html'
    });
  }
]);
