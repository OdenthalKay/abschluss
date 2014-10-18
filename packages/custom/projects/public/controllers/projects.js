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

angular.module('mean.projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Global', 'Projects',
  function($scope, $stateParams, $location, Global, Projects) {
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

   $scope.create = function() {
        console.log('descriptionText: '+$scope.questions.descriptionText);

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


    /*
    QUIZ-Logic
    */
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
