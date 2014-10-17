'use strict';

angular.module('mean.projects').controller('ProjectsQuestionsController', ['$scope', 'Global', 'Projects',
  function($scope, Global, Projects) {
    $scope.global = Global;
    $scope.package = {
      name: 'projects'
    };
    $scope.questionAnswerPairs = [];
    $scope.descriptionText = '';
    $scope.count = 0;

    $scope.createQuestionAnswerPairs = function() {
        for (var i = 0; i < $scope.count; i = i+1) {
            $scope.questionAnswerPairs[$scope.questionAnswerPairs.length] = {question: '', answer: ''};
        }
        console.log($scope.questionAnswerPairs);
    };


  }
]);