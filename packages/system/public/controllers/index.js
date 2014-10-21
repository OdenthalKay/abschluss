'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global',
	function($scope, $http, Global) {
		$scope.global = Global;

		/*
		Der User wird geladen, wenn der Home-View geöffnet wird.
		=> Es MUSS nach login immer zuerst der home-view geöffnet werden,
		da ansonstender User nicht geladen wurde.
		=> Bei '/tutorials/create' bspw. stürzt die Anwendung ab
		*/
		$scope.loadUser = function() {
			$http.get('/users/me').
			success(function(data, status, headers, config) {
				$scope.global.user = data;
			}).
			error(function(data, status, headers, config) {
			});

	};

}

]);
