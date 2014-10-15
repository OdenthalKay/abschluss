'use strict';

angular.module('mean.slideshoweditor').directive('editorStageDirective',  ['$timeout', function($timeout) {
  return {
      restrict: 'E',
      templateUrl: 'slideshoweditor/views/editor-stage.html',
      link: function(scope, elem, attr) {
        var stageDivID = 'editor-stage';

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
          scope.createEditorStage(stageDivID);
          scope.scaleEditorStage(stageDivID);
        });


        // callback für skalierung registrieren
        window.onresize = function() {
          scope.scaleEditorStage(stageDivID);
        };
      }
    };
}]); 


    

