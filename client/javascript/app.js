// This regulates which route go's with which template and controller
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
        .otherwise({redirectTo: '/'});

    }]
    );