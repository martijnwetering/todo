var controllers = angular.module('myApp.controllers', ['myApp.services']);

controllers.controller('mainCtrl', ['$scope', '$location', 'Security', function ($scope, $location, Security) {

		$scope.security = Security;
	}
]);

controllers.controller('todoCtrl', ['$scope', '$location', 'Security', 'Todo', 'TodoList', function ($scope, $location, Security, Todo, TodoList) {
		$scope.security = Security;

		$scope.newTodo = function () {
			$scope.todo.userId = Security.currentUser.email;
			Todo.save({}, $scope.todo, function (res) {
				getTodo();
			});
		}

		getTodo = function () {
			var userId = Security.currentUser.email;
			$scope.todos = TodoList.get({userId: userId});
		}
		getTodo();

	}
]);