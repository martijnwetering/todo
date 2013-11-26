var controllers = angular.module('myApp.controllers', ['myApp.services', 'ngCookies']);

controllers.controller('mainCtrl', function ($scope, $location, $cookies, Security) {

		$scope.security = Security;
		console.log('mainCtrl cookie: ' ,$cookies);
	}
);

controllers.controller('todoCtrl', function ($scope, $rootScope, $location, $cookies, $cookieStore, Security, Todo, TodoList) {
		$scope.security = Security;
		//Security.currentUser = $cookieStore.get('user');
		console.log('todoCtrl cookie: ', $cookies);

		$scope.newTodo = function () {
			$scope.todo.userId = Security.currentUser.email;
			Todo.save({}, $scope.todo, function (res) {
				getTodo();
			});
			$scope.todo.content = '';
		}

		getTodo = function () {
			var userId = Security.currentUser.email;
			$scope.todos = TodoList.get();
		}
		getTodo();

	}
);