'use strict';

angular.module('mean.projects').controller('ProjectsExercisesController', ['$scope', 'Global', 'Projects',
  function($scope, Global, Projects) {
    $scope.global = Global;
    $scope.package = {
      name: 'projects'
    };
    $scope.exerciseTexts = [];
    $scope.answers = [];

    $scope.addExerciseText = function() {
        $scope.exerciseTexts[$scope.exerciseTexts.length] = '';
    };

     $scope.removeExerciseText = function(exerciseText) {
        for (var i=0; i < $scope.exerciseTexts.length; i=i+1) {
            if ($scope.exerciseTexts[i] === exerciseText) {
                 $scope.exerciseTexts.splice(i,1);
                 return;
            }
        }
    };

    $scope.initAnswers = function() {
        for (var i=0; i < $scope.exerciseTexts.length; i=i+1) {
            $scope.answers[$scope.answers.length] = null;
        }
    };


  }
]);