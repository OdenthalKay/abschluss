'use strict';

angular.module('mean.projects').controller('ProjectsQuizController', ['$scope', 'Global', 'Projects',
  function($scope, Global, Projects) {
    $scope.global = Global;
    $scope.package = {
      name: 'projects'
    };
    $scope.quizQuestions = [];
    $scope.quizAnswers = [];

    $scope.addQuizQuestion = function() {
    	$scope.quizQuestions[$scope.quizQuestions.length] = {
    		text: 'text',
    		option1: 'option1',
    		option2: 'option2',
    		correctOption: null
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

    $scope.initQuizAnswers = function() {
    	for (var i=0; i < $scope.quizQuestions.length; i=i+1) {
    		$scope.quizAnswers[$scope.quizAnswers.length] = null;
    	}
    };

    $scope.evaluateQuizAnswers = function() {
    	var errors = 0;
    	for (var i=0; i < $scope.quizAnswers.length; i=i+1) {
    		if ($scope.quizAnswers[i] !== $scope.quizQuestions[i].correctOption) {
    			errors = errors + 1;
    		}
    	}
    	if (errors > 0) {
    		alert(errors+' Antworten sind falsch.');
    	} else {
    		alert('Alles richtig!');
    	}
    };


  }
]);