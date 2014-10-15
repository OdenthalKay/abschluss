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
]);