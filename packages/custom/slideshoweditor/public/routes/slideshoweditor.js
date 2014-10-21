'use strict';

angular.module('mean.slideshoweditor').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('slideshoweditor', {
      url: '/slideshoweditor',
      templateUrl: 'slideshoweditor/views/index.html'
    }).state('slideshows create', {
      url: '/tutorials/:tutorialId/slideshows/create',
      templateUrl: 'slideshoweditor/views/index.html'
    });
  }
]);
