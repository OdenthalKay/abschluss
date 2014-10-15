'use strict';

/*
Genaue Erläuterung bzgl. dem Auufruf von setColor im Controller:
http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-3-isolate-scope-and-function-parameters

Diese Direktive ruft die Funktion 'setColor(color)' aus dem SlideshowController auf.
Der Paremeter muss als Objektliteral übergeben werden.
*/

angular.module('mean.slideshoweditor').directive('colorPaletteDirective',  function() {
  return {
    restrict: 'E',
    templateUrl: 'slideshoweditor/views/color-palette.html',
    // isolierter scope
    scope: {
      setColor: '&'
    },
    controller: function($scope, $element) {
      $scope.row0 = ['#000000', '#424242', '#919191', '#E0E0E0', '#FFFFFF'];
      $scope.row1 = ['#ac725e', '#d06b64', '#f83a22', '#fa573c', '#ff7537'];
      $scope.row2 = ['#ffad46', '#42d692', '#16a765', '#7bd148', '#b3dc6c'];
      $scope.row3 = ['#fbe983', '#fad165', '#92e1c0', '#9fe1e7', '#9fc6e7'];
      $scope.row4 = ['#4986e7', '#9a9cff', '#b99aff', '#c2c2c2', '#cabdbf'];
      $scope.rows = [$scope.row0, $scope.row1, $scope.row2, $scope.row3, $scope.row4];


      $scope.getColor = function(rowIndex, index) {
        var color = $scope.rows[rowIndex][index];
        $scope.setColor({color: color});
      };
    }
  };
}); 


    

