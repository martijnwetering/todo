var directives = angular.module('myApp.directives', []);

directives.directive("login", function () {
    return {
        restrict: "E",
        scope: {},
        replace: true,
        templateUrl: "partials/login.html",
        controller: function ($scope, Security) {
            $scope.security = Security;
        },
        link: function (scope) {
        }
    };
});

directives.directive("loginToolbar", function () {
    return {
        restrict: "E",
        scope: {},
        replace: true,
        templateUrl: "partials/login-toolbar.html",
        controller: function ($scope, Security) {
            $scope.security = Security;
        },
        link: function (scope) {
        }
    };
});

directives.directive("signup", function () {
    return {
        restrict: "E",
        scope: {},
        replace: true,
        templateUrl: "partials/signup.html",
        controller: function ($scope, Security) {
            $scope.user = {};
            $scope.security = Security;
        },
        link: function (scope) {
            scope.$watch("user.password", function (value) {
                //scope.user.passwordStrength = !value || value.length === 0 ? 0 : typeof zxcvbn !== "undefined" ? zxcvbn(value).score : 0;
            });
        }
    };
});