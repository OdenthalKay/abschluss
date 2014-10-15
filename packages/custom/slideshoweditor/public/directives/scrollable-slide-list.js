'use strict';

angular.module('mean.slideshoweditor').directive('scrollableSlideListDirective', ['$timeout', function($timeout) {



return {
  		restrict: 'E',
  		templateUrl: 'slideshoweditor/views/scrollable-slide-list.html',
  		      link: function(scope, elem, attr) {
        /*
         * $timeout ist ein wrapper für window.setTimeout().
         * $timeout führt die Funktion für die Initialisierung der Stages
         * erst aus, nachdem die link function ausgeführt wurde (und ruft danach
         * $scope.$apply() auf).
         *
         * Dann ist garantiert, dass der DOM vollständig ist.
         * Ansonsten werden die Container für die Stages nicht gefunden, da
         * sie von der ng-repeat Direktive erst noch erstellt werden müssen.
         *
         */
        $timeout(function() {
          for (var i = 0; i < scope.slides.length; i = i+1) {
            scope.createPreviewStage('slide'+i);
          }
        });
      }
  	};
}]); 


  	

