var controllers = angular.module('myApp.controllers', ['myApp.services']);

controllers.controller('mainCtrl', ['$scope', '$location', 'Security', function ($scope, $location, Security) {

		$scope.security = Security;
	}
]);