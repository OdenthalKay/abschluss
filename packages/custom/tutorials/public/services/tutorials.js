'use strict';


//Articles service used for articles REST endpoint

angular.module('mean.tutorials').factory('Tutorials', ['$resource',
	function($resource) {
			return $resource('tutorials/:tutorialId', {
	    // Jedes Mal wenn 'delete' oder 'update' auf dieser Ressource aufgerufen wird,
	    // wird die Variable tutorialId auf die Eigenschaft '_id'  des aufrufenden Instanzobjekts gesetzt.
	    tutorialId: '@_id'
		},
		{
		// Manche APIs benötigen einen PUT-Request
		'update': { method:'PUT' }
		});
	}
]).factory('TutorialOwner', function() {
  return {
    isOwner: function(user, tutorialId) { 
    	console.log(user);
      var  tutorialIds = user.tutorialIds;
      for (var i = 0; i < tutorialIds.length; i=i+1) {
          if (tutorialId === tutorialIds[i]) {
            return true;
          }
      }

      return false;
    }
  };
});