'use strict';

/*
 * SlideshowEditorCanvas
 * Dieses Modul enthält sämtliche Funktionen, die mit den Canvas-Elementen (= Stages)
 * des KineticJS Frameworks interagieren.
 *
 *
 */
angular.module('mean.slideshoweditor').controller('SlideshoweditorController', ['$scope', '$timeout', '$stateParams', '$location', 'Global', 'Slideshows',
  function($scope, $timeout, $stateParams, $location, Global, Slideshows) {
    $scope.global = Global;

  $scope.slides = [];
  $scope.slide = null;
  $scope.ratio = 16 / 9;
  $scope.slideWidth = 800;
  $scope.slideHeight = $scope.slideWidth / $scope.ratio;
  $scope.defaultFontSize = 25;
  $scope.defaultFontStyle = 'Arial';
  $scope.stage = {};
  $scope.activeStageElement = null;
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

$scope.createEmptyLayer = function() {
    var layer = new Kinetic.Layer();
    var background = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: $scope.slideWidth,
      height: $scope.slideHeight,
      fill: '#FFFFFF',
    });
    layer.add(background);
    return layer;
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

  /*
  Wird aufgerufen wenn ein Label/Bild angeklickt wird
  TODO: an Bild anpassen (Fallunterscheidung)

  */
  $scope.clickHandler = function() {
    if ($scope.activeStageElement !== null) {
      $scope.activeStageElement.getTag().visible(false);
    }

    $scope.activeStageElement = this;
    this.getTag().visible(true);
    $scope.draw();
  };


  /*
  Während der Bearbeitung mit editor werden eigenständige slide-objekte verwendet,
  keine ngResource Instanzen
  */
  $scope.load = function() {
      Slideshows.get({
        slideshowId: '54469f5ac579710a3acfd38e',
        tutorialId: '5442b74d48c3f67701f6fe4f'
      }, function(slideshow) {
        // Falls eine slideshow mit der entsprechenden ID existiert, wird sie zur Initialisierung genommen
        for (var i = 0; i < slideshow.slides.length; i=i+1) {
              var slideDocument = slideshow.slides[i];

              var slide = {
                jsonData: slideDocument.jsonData,
                imageData: slideDocument.imageData
              };

              // Für jedes Slide-Datenbankobjekt einen Layer erstellen
              var layer = Kinetic.Node.create(slide.jsonData);
              $scope.stage.add(layer);
              
            /*
            Allen Labels/Bildern eines Layers einen onClickListener zuweisen
            (ist in jsonData nicht enthalten, muss manuell gemacht werden)
            ACHTUNG: das erste Kind ist der Layer selbst
            */
            for (var j = 1; j < layer.getChildren().length; j = j+1) {
              var element = layer.getChildren()[j];
              element.on('click', $scope.clickHandler);
            }

              // Layer als Eigenschaft setzen und slide-Arary hinzufügen
              slide.layer = layer;
              $scope.slides[$scope.slides.length] = slide;
        }

        // Aktuelle Slide setzen
        $scope.slide = $scope.slides[0];
      });
  };

  $scope.save = function() {
    $scope.updateSlide($scope.slide);

    // SlideObjekte gemäß SlideSchema erstellen
    var slideObjects = [];
    for (var i = 0; i < $scope.slides.length; i= i+1) {
      var slideObject = {
        jsonData: $scope.slides[i].jsonData,
        imageData: $scope.slides[i].imageData
      };
      slideObjects[i] = slideObject;
    }

    // Slides speichern
    var slideshow = new Slideshows({
      name: 'NeueSlideshow',
      slides: slideObjects
    });

    var tutorialId = $stateParams.tutorialId;
    slideshow.$save({tutorialId:tutorialId},function(response) {
      var path = 'tutorials/'+tutorialId+'/slideshows';
      $location.path(path);
      console.log(response);
    });
  };

   $scope.updateSlide = function(slide) {
      var layer = slide.layer;

      layer.toImage({
        callback: function(img) {
          slide.jsonData = layer.toJSON();
          slide.imageData = img.src;
          $scope.$apply();
        }
      });
    };

  $scope.selectSlide = function(index) {
     // Umrandung unsichtbar machen
     if ($scope.activeStageElement !== null) {
      $scope.activeStageElement.getTag().visible(false);
      $scope.draw();
    }

    // Status vom vorherigen Layer speichern, falls es einen gab
   $scope.updateSlide($scope.slide);

    // Neue Slide setzen und zugehörigen Layer ganz oben positionieren, damit sichtbar
    $scope.slide = $scope.slides[index];
    $scope.slide.layer.moveToTop();
  };


    $scope.addNewSlide = function() {
        if ($scope.slide !== null) {
          $scope.updateSlide($scope.slide);
        } 
        
        // Neuen layer erstellen
        var newLayer = $scope.createEmptyLayer();
        
        // 'toImage' funktioniert nur, wenn Layer zuvor der Stage hinzuegfügt wurde!
        $scope.stage.add(newLayer);
        newLayer.toImage({
        callback: function(img) {
          var newSlide = {
            layer: newLayer,
            jsonData: newLayer.toJSON(),
            imageData: img.src
          };
          /*
          Hier muss $scope.$apply() stehen, da der Callback-Code
          asynchron ausgeführt wird. Ansonsten werden die Änderungen
          nicht direkt sichtbar.
          */
          $scope.slides[$scope.slides.length] = newSlide; 
          $scope.slide = newSlide; 
          $scope.$apply();
        }
      });
};

  $scope.removeSlide = function(index) {
    var slide = $scope.slides[index];
    slide.layer.remove();
    slide.layer.destroy();
    $scope.slides.splice(index,1);

    $scope.activeStageElement = null;
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

    label.on('click', $scope.clickHandler);

    $scope.slide.layer.add(label);
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