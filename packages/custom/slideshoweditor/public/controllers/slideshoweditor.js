'use strict';

/*
 * SlideshowEditorCanvas
 * Dieses Modul enthält sämtliche Funktionen, die mit den Canvas-Elementen (= Stages)
 * des KineticJS Frameworks interagieren.
 *
 *
 */
angular.module('mean.slideshoweditor').controller('SlideshoweditorController', ['$scope', '$timeout', 'Global', 
  function($scope, $timeout, Global) {
    $scope.global = Global;

  /*
   * Variablen
   *
   */
  $scope.slides = [];
  $scope.ratio = 16 / 9;
  $scope.previewStageWidth = 100;
  $scope.previewStageHeight = $scope.previewStageWidth / $scope.ratio;
  $scope.slideWidth = 800;
  $scope.slideHeight = $scope.slideWidth / $scope.ratio;
  $scope.defaultFontSize = 25;
  $scope.defaultFontStyle = 'Arial';
  $scope.editorStageBackgroundColor = '#ffdddd';
  $scope.editorStage = {};
  $scope.editorLayer = {};

  $scope.activeStageElement = null;
  $scope.activePreviewStage = null;
  $scope.color = '#000000';

/* 
Beim Verlassen des Slideshoweditors soll wieder die Bootstrap Klasse
'container' verwendet werden, damit die Applikation wieder responsive ist.
*/
$scope.$on('$locationChangeStart', function( event ) {
    var answer = confirm('Are you sure you want to leave this page?');
    if (!answer) {
        event.preventDefault();
    }
    angular.element('#section-container').attr('class', 'container');
});
/* 
Beim Öffnen des Slideshoweditors soll die custom Klasse
'container-full' verwendet werden, der Editor die komplette Breite ausnutzt.
*/
$scope.disableResponsiveness = function() {
  angular.element('#section-container').attr('class', 'container-full');
};

  /*
   * Wird von der Direktive "editorStage" aufgerufen.
   *
   */
  $scope.createEditorStage = function(editorStageDivID) {
    $scope.editorStage = new Kinetic.Stage({
      container: editorStageDivID,
      width: $scope.slideWidth,
      height: $scope.slideHeight
    });

    $scope.editorLayer = new Kinetic.Layer();

    var background = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: $scope.slideWidth,
      height: $scope.slideHeight,
      fill: $scope.editorStageBackgroundColor,
    });

    // add the shape to the layer
    $scope.editorLayer.add(background);
    $scope.editorStage.add($scope.editorLayer);
  };


/*
   * Wird von der Direktive "scrollableSlideList" aufgerufen.
   *
   */
  $scope.addSlide = function() {
    var slideId = $scope.slides.length;
    $scope.slides[$scope.slides.length] = {id: slideId};
    $scope.$apply(); // muss hier stehen

    $timeout(function() {
      $scope.createPreviewStage('slide'+slideId);
    });    
  };

  /*
   * Wird von der Direktive "scrollableSlideList" aufgerufen.
   *
   */
  $scope.removeSlide = function() {
    if ($scope.activePreviewStage !== null) {
         $scope.activePreviewStage.destroy();
         
         // TODO: zugehörige slide entfernen
         //$scope.$apply(); // muss hier stehen  
    }
  };

  $scope.createPreviewStage = function(previewStageDivID) {
    var stage = new Kinetic.Stage({
      container: previewStageDivID,
      width: $scope.previewStageWidth,
      height: $scope.previewStageHeight
    });

    var layer = new Kinetic.Layer();

    var background = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: $scope.previewStageWidth,
      height: $scope.previewStageHeight,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1
    });

    // markiere eine stage als markiert, wenn ihr layer geklickt wurde
    layer.on('click', function() {
          $scope.activePreviewStage = layer.getStage();
      });

    layer.add(background);
    stage.add(layer);
  };

  /*
   * Wird als Callback für "window.resize" in der Direktive "editorStage" registriert.
   *
   * Beim Skalieren bleibt die ursprüngliche Position und Größe aller Elemente des Layers erhalten.
   * Die Skalierungsfunktion von KineticJS berechnet die Pixel neu. Dementsprechend verlieren
   * skalierte Elemente nicht an Schärfe.
   *
   */
  $scope.scaleEditorStage = function(editorStageDivID) {
    var editorStageContainerWidth = angular.element('#' + editorStageDivID).width();
    //if (editorStageContainerWidth <= $scope.slideWidth) {
      // Verhindern, dass der Editor zu klein wird.
      //return;
    //}

    // Hintergrundlayer mitsamt Elementen auf die Breite/Hoehe des Containers skalieren
    var scale = editorStageContainerWidth / $scope.slideWidth;
    $scope.editorStage.scale({
      x: scale,
      y: scale
    });
    $scope.editorStage.size({
      width: editorStageContainerWidth,
      height: editorStageContainerWidth / $scope.ratio
    });
    console.log($scope.editorStage.getWidth());
    console.log($scope.editorStage.getHeight());
  };


  /*
   *
   *
   */
   $scope.addLabel = function() {
    var label = new Kinetic.Label({
      x: 20,
      y: 20,
      draggable: true
    });

    label.add(new Kinetic.Tag({
          stroke: 1
        }));

    label.add(new Kinetic.Text({
      text: 'Text',
      fontFamily: $scope.defaultFontStyle,
      fontSize: $scope.defaultFontSize,
      padding: 5,
      fill: 'black'
    }));
    label.getTag().visible(false);


    label.on('click', function() {
          // In den Code muss noch eine Fallunterscheidung bzgl. Label/Bild
          // gemacht werden
          if ($scope.activeStageElement !== null) {
            $scope.activeStageElement.getTag().visible(false);
          }

          $scope.activeStageElement = label;
          label.getTag().visible(true);
          $scope.draw();
      });

    $scope.editorLayer.add(label);
    $scope.draw();
  };

  $scope.normalText = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fontStyle('normal');
    $scope.draw();
  };

  $scope.boldText = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fontStyle('bold');
    $scope.draw();
  };
  $scope.italicText = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fontStyle('italic');
    $scope.draw();
  };

  $scope.draw = function() {
    $scope.editorStage.draw();
  };

  $scope.deleteActiveElement = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    $scope.activeStageElement.destroy();
    $scope.activeStageElement = null;
    $scope.draw();
  };

  $scope.scaleActiveElement = function(scaleValue) {
  if ($scope.activeStageElement === null) {
      return;
    }

    $scope.activeStageElement.scale({x:scaleValue,y:scaleValue});
    $scope.draw();
  };

  $scope.setLabelText = function(labelText) {
  if ($scope.activeStageElement === null) {
      return;
    }

   var textObject = $scope.activeStageElement.getText();
        textObject.setText(labelText);
        $scope.draw();
  };

  $scope.setActiveLabelColor = function() {
      if ($scope.activeStageElement === null) {
      return;
    }

    $scope.activeStageElement.fill('green');
  };

   /*
  * Nur für Labels
  */
  $scope.setColor = function(color) {
    if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fill(color);
    $scope.draw();
  };






    






    

}]);