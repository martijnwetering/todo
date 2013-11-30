var controllers = angular.module('myApp.controllers', ['myApp.services', 'ngCookies']);

controllers.controller('mainCtrl', function ($scope, $location, Security) {

		$scope.security = Security;

		$scope.$on('event:LoginRequired', function() {
			alert('Wrong username/password');
			$location.path('/');
		});
	}
);

controllers.controller('todoCtrl', function ($scope, $rootScope, $location, $cookieStore, Security, Todo, TodoList) {
		$scope.security = Security;
		//Security.currentUser = $cookieStore.get('user');

		$scope.newTodo = function () {
			$scope.todo.userId = Security.currentUser.email;
			Todo.save({}, $scope.todo, function (res) {
				getTodo();
			});
			$scope.todo.content = '';
		};

		getTodo = function () {
			var userId = Security.currentUser.email;
			$scope.todos = TodoList.get();
		};
		getTodo();

	}
);