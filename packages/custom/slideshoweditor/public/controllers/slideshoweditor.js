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

  $scope.slides = [];
  $scope.ratio = 16 / 9;
  $scope.slideWidth = 800;
  $scope.slideHeight = $scope.slideWidth / $scope.ratio;
  $scope.defaultFontSize = 25;
  $scope.defaultFontStyle = 'Arial';
  $scope.stage = {};

  $scope.activeStageElement = null;
  $scope.color = '#000000';

  $scope.layers = [];
  $scope.layer = null;

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

$scope.addEmptyLayer = function() {
    var layer = new Kinetic.Layer();
    var background = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: $scope.slideWidth,
      height: $scope.slideHeight,
      fill: '#FFFFFF',
    });
    layer.add(background);

    $scope.layers[$scope.layers.length] = layer;
    $scope.layer = layer;
    $scope.stage.add(layer);
};

  /*
   * Wird von der Direktive "editorStage" aufgerufen.
   *
   */
  $scope.createEditorStage = function(editorStageDivID) {
    $scope.stage = new Kinetic.Stage({
      container: editorStageDivID,
      width: $scope.slideWidth,
      height: $scope.slideHeight
    });
  };

  $scope.init = function() {
    // Preview-Leiste

  };


  $scope.selectSlide = function(index) {
    $scope.updateSlideData();
    angular.element('#slide'+index).attr('class', 'slide selected');
    $scope.layer = $scope.layers[index];
    $scope.layer.slideIndex = index;
    $scope.layer.moveToTop();
  };

  $scope.updateSlideData = function() {
if ($scope.layer !== null) {
      var index = $scope.layer.slideIndex;
      angular.element('#slide'+index).attr('class', 'slide');
   

       $scope.layer.toImage({
      callback: function(img) {
        var slide = $scope.slides[index];
        slide.jsonData = $scope.layer.toJSON();
        slide.imageData = img.src;
        $scope.$apply();
      }
    });
   }
  };

  $scope.addSlide = function() {
    var index = $scope.slides.length;
    $scope.updateSlideData();
    $scope.addEmptyLayer();
    $scope.layer.moveToTop();

 // Funktioniert nur, wenn layer zuvor der stage hinzugefügt wurde
  $scope.layer.toImage({
  callback: function(img) {
    var slide = {
      index: index,
      jsonData: $scope.layer.toJSON(),
      imageData: img.src
    };

    /*
    Hier muss $scope.$apply() stehen, da der Callback-Code
    asynchron ausgeführt wird. Ansonsten werden die Änderungen
    nicht direkt sichtbar.
    */
    var newIndex = $scope.slides.length;
    $scope.layer.slideIndex = newIndex;
    $scope.slides[newIndex] = slide;  
    $scope.$apply();
    angular.element('#slide'+index).attr('class', 'slide selected');
  }
});


  };

  $scope.removeSlide = function(index) {
      $scope.slides.splice(index,1);
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
    $scope.stage.scale({
      x: scale,
      y: scale
    });
    $scope.stage.size({
      width: editorStageContainerWidth,
      height: editorStageContainerWidth / $scope.ratio
    });
    console.log($scope.stage.getWidth());
    console.log($scope.stage.getHeight());
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

    $scope.layer.add(label);
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
    $scope.stage.draw();
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