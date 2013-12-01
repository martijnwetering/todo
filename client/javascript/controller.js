var controllers = angular.module('myApp.controllers', ['myApp.services', 'ngCookies']);

controllers.controller('mainCtrl', function ($scope, $location, Security, ErrorService) {

		$scope.security = Security;
		$scope.errorService = ErrorService;

		$scope.$on('event:LoginRequired', function() {
			alert('Wrong username/password');
			$location.path('/');
		});
	}
);

controllers.controller('todoCtrl', function ($scope, $rootScope, $location, $http, $cookieStore, Security, Todo, TodoList, ErrorService) {
		
		$scope.security = Security;
		$scope.errorService = ErrorService;

		$scope.newTodo = function () {
			$scope.todo.userId = Security.currentUser.email;
			Todo.save({}, $scope.todo, function (res) {
				getTodo();
			});
			$scope.todo.content = '';
		};

		$scope.delete = function(){
        	var id = this.todo._id;
        	
        	/*$http.delete('/v1/todolist', {id: id}).success(function (res) {
        		$scope.err = JSON.stringify(res.err);
            	$location.path('/todo');
        	});*/

        	TodoList.delete({ id:id }, function (res) {
            	$scope.err = JSON.stringify(res.err);
            	$location.path('/todo');
        	});
    	} 

		getTodo = function () {
			var userId = Security.currentUser.email;
			$scope.todos = TodoList.get();
		};
		getTodo();

	}
);