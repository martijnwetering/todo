var controllers = angular.module('myApp.controllers', ['myApp.services']);

controllers.controller('mainCtrl', ['$scope', '$location', 'User', function ($scope, $location, User) {

	$scope.login = function() {
		console.log('login function accessed');
		console.log($scope.user);
		User.save($scope.user, function (res) {
			$scope.err = JSON.stringify(res.err);
		});

		$scope.user = "";
	}
	
}]);