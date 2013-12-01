var directives = angular.module('myApp.directives', []);

directives.directive("login", function () {
    return {
        restrict: "E",
        scope: {},
        replace: true,
        templateUrl: "partials/login.html",
        controller: function ($scope, Security, ErrorService) {
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
        controller: function ($scope, Security, ErrorService) {
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
        controller: function ($scope, Security, ErrorService) {
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

directives.directive('alertBar', function ($parse) {
    return {
        restrict: 'A',
        template: '<div class="alert alert-error alert-bar"' +
                    'data-ng-show="errorMessage">' +
                    '<button type="button" class="close" data-ng-click="hideAlert()">' +
                    'x</button>' +
                    '{{errorMessage}}</div>',
        controller: function($scope, Security, ErrorService) {
            $scope.security = Security;
            $scope.errorService = ErrorService;
        },
        link: function (scope, elem, attrs) {
            console.log(scope);
            var alertMessageAttr = attrs['alertmessage'];
            console.log(alertMessageAttr);
            scope.errorMessage = null;

            scope.$watch(alertMessageAttr, function (data) {
                scope.errorMessage = data;
            });

            scope.hideAlert = function() {
                scope.errorMessage = null;
                $parse(alertMessageAttr).assign(scope, null);
            };
        }
    };
});













