'use strict';

angular.module('mean.projects').factory('Projects', ['$resource',
  function($resource) {
    return $resource('tutorials/:tutorialId/projects/:projectId', {
    // bei update/delete steht keine slideshowId in der Adressleiste
    // also setzen wir sie selbstständig auf den internenen ID-Wert '@_id'
    // ACHTUNG: Die tutorialId muss AUCH selbstständig gesetzt werden.
    // Sie wird als Parameter übergeben und hier zugewiesen.
      tutorialId: '@id',
      slideshowId: '@_id'
    },{
      'update': {method:'PUT'}
    }
    );
  }
]);