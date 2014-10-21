'use strict';

angular.module('mean.slideshows').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('slideshows', {
      url: '/tutorials/:tutorialId/slideshows',
      templateUrl: 'slideshows/views/list.html'
    }).state('slideshow edit', {
        url: '/tutorials/:tutorialId/slideshows/:slideshowId/edit',
        templateUrl: 'slideshows/views/edit.html'
      });
  }
]);



