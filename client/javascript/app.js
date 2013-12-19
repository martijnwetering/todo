// Client-side routing.
var myApp = angular.module('myApp', ['myApp.services', 'myApp.controllers', 'myApp.directives', 'ngRoute']);

    myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
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
        $locationProvider.html5Mode(true);

    }]
    );