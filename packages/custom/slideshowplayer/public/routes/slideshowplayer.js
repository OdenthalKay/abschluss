'use strict';

angular.module('mean.slideshowplayer').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('slideshowplayer', {
      url: '/slideshowplayer/example',
      templateUrl: 'slideshowplayer/views/index.html'
    }).state('slideshow by id', {
        url: '/tutorials/:tutorialId/slideshows/:slideshowId',
        templateUrl: 'slideshowplayer/views/index.html'
      });
  }
]);
