'use strict';

angular.module('mean.comments').factory('Comments', ['$resource',
  function($resource) {
    return $resource('tutorials/:tutorialId/comments/:commentId', {
      tutorialId: '@id',
      commentId: '@_id'
    },{
      'update': {method:'PUT'}
    }
    );
  }
]);