'use strict';

angular.module('mean.slideshows').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('slideshows', {
      url: '/tutorials/:tutorialId/slideshows',
      templateUrl: 'slideshows/views/list.html'
    }).state('slideshows create', {
      url: '/tutorials/:tutorialId/slideshows/create',
      templateUrl: 'slideshows/views/create.html'
    }).state('slideshow by id', {
        url: '/tutorials/:tutorialId/slideshows/:slideshowId',
        templateUrl: 'slideshows/views/view.html'
      }).state('slideshow edit', {
        url: '/tutorials/:tutorialId/slideshows/:slideshowId/edit',
        templateUrl: 'slideshows/views/edit.html'
      });
  }
]);



