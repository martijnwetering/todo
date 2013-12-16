// Client-side routing.
var myApp = angular.module('myApp', ['myApp.services', 'myApp.controllers', 'myApp.directives']);

    myApp.config(['$routeProvider', function ($routeProvider) {
    
        $routeProvider.when('/', {
            templateUrl: 'partials/main.html',
            controller: 'mainCtrl'
        })
        .when('/account', {
            templateUrl: 'partials/account.html',
            controller: 'mainCtrl'
        })
        .when('/todo', {
            templateUrl: 'partials/todoList.html',
            controller: 'todoCtrl'
        })
        .otherwise({redirectTo: '/'});

    }]
    );