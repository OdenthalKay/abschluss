'use strict';

/*
ACHTUNG:
In den Child-States...
quiz-create.html
questions-and-answers.html
exercises.html
darf der Controller NICHT erneut aufgelistet werden,
da ansonsten ein neuer Scope erstellt wird und
die Änderungen nicht im eigentlichen Scope auftauchen.
*/

angular.module('mean.projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Global', 'Projects', 'TutorialOwner',
  function($scope, $stateParams, $location, Global, Projects, TutorialOwner) {
    $scope.global = Global;
    $scope.package = {
      name: 'projects'
    };
    /*
    Für jeden Aufgabentyp wird ein Default-Eintrag erstellt, damit sichergestellt ist,
    dass jede Ebene in einem Projekt vertreten ist
    */
    $scope.quizQuestions = [{
        question: 'Frage',
        option1: 'option1...',
        option2: 'option2...',
        correctOption: 0
    }];
    $scope.questions = {descriptionText:'Beschreibung...', count: 1};
    $scope.exercises = {exerciseTexts: [
      'Erläutern Sie die Vorteile des Scheduling Algorithmus FCFS.'
      ]};

    // Hier werden die Antworten für die Auswertung zwischengespeichert (nur bei Quiz notwendig)
    $scope.quizAnswers = [];
    $scope.questionAnswerPairs = [];
    $scope.exercisesQuestionAnswerPairs = [];

    $scope.init = function() {
        if (!TutorialOwner.isOwner($scope.global.user, $stateParams.tutorialId)) {
          alert('Dies ist nicht ihr Tutorial. Sie können keine Projekte bei fremden Tutorials erstellen.');
          var path = 'tutorials/'+$stateParams.tutorialId+'/projects';
          $location.path(path);
        }
    };

   $scope.findOne = function() {
      Projects.get({
        projectId: $stateParams.projectId,
        tutorialId: $stateParams.tutorialId
      }, function(project) {
        console.log(project);
        $scope.project = project;
        $scope.initQuestionAnswerPairs();
        $scope.initExerciseQuestionAnswerPairs();
      });
    };

    $scope.initQuestionAnswerPairs = function() {
      for (var i = 0; i < $scope.project.questionsData.count; i = i +1) {
          $scope.questionAnswerPairs[i] = {
            question: 'Frage...',
            answer: 'Antwort...'
          };
      }
    };

    $scope.initExerciseQuestionAnswerPairs = function() {
      for (var i = 0; i < $scope.project.exercisesData.length; i = i +1) {
          $scope.exercisesQuestionAnswerPairs[i] = {
            question: $scope.project.exercisesData[i],
            answer: 'Antwort...'
          };
      }
    };

    $scope.findAll = function() {
      Projects.query({tutorialId:$stateParams.tutorialId}, function(projects) {
        $scope.projects = projects;
      });
    };

   /*
    Erstelle ein komplettes Projekt mitsamt allen Ebenen.
   */
   $scope.create = function() {
        var project = new Projects({
          quizData: $scope.quizQuestions,
          questionsData: {
            descriptionText: $scope.questions.descriptionText,
            count: $scope.questions.count
          },
          exercisesData: $scope.exercises.exerciseTexts
        });

        var tutorialId = $stateParams.tutorialId;
        project.$save({tutorialId:tutorialId},function(response) {
          var path = 'tutorials/'+tutorialId+'/projects/' + response._id;
          $location.path(path);
        });
    };

    $scope.absenden = function() {
      // TODO:
      // Prüfen ob alle Eingaben korrekt sind

      var path = 'tutorials/'+$stateParams.tutorialId+'/projects';
      console.log(path);
          $location.path(path);
    };

    /*
    QUIZ-Logic
    */
    // Für Erstellung
    $scope.addQuizQuestion = function() {
      $scope.quizQuestions[$scope.quizQuestions.length] = {
        question: 'Frage',
        option1: 'option1...',
        option2: 'option2...',
        correctOption: 0
      };
    };

    $scope.removeQuizQuestion = function(question) {
      for (var i=0; i < $scope.quizQuestions.length; i=i+1) {
        if ($scope.quizQuestions[i] === question) {
           $scope.quizQuestions.splice(i,1);
                 return;
        }
      }
    };

    // Für Bearbeitung 
    $scope.evaluateQuizAnswers = function() {
      var errors = 0;

      for (var i = 0; i < $scope.project.quizData.length; i = i+1) {
        // String in Integer umwandeln
        var quizAnswer = parseInt($scope.quizAnswers[i]);
        if (quizAnswer !== $scope.project.quizData[i].correctOption) {
            errors = errors +1;
        }
      }

      if (errors > 0) {
        alert('Fehler: '+errors +'. Das Quiz muss fehlerfrei sein, damit die nächste Ebene freigeschaltet wird.');
      } else {
        alert('Alles richtig!');
      }
    };

    /*
    EXERCISES-Logic
    */
      $scope.addExerciseText = function() {
        $scope.exercises.exerciseTexts[$scope.exercises.exerciseTexts.length] = '';
    };

     $scope.removeExerciseText = function(exerciseText) {
        for (var i=0; i < $scope.exercises.exerciseTexts.length; i=i+1) {
            if ($scope.exercises.exerciseTexts[i] === exerciseText) {
                 $scope.exercises.exerciseTexts.splice(i,1);
                 return;
            }
        }
    };






  }
]);
