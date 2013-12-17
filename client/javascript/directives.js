var directives = angular.module('myApp.directives', []);

directives.directive('login', function () {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: 'partials/login.html',
        controller: function ($scope, Security, ErrorService) {
            $scope.security = Security;
        },
        link: function (scope) {
        }
    };
});

directives.directive('loginToolbar', function () {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: 'partials/login-toolbar.html',
        controller: function ($scope, Security, ErrorService) {
            $scope.security = Security;
        },
        link: function (scope) {
        }
    };
});

directives.directive('signup', function () {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: 'partials/signup.html',
        controller: function ($scope, Security, ErrorService) {
            $scope.user = {};
            $scope.security = Security;
        },
        link: function (scope, element, attrs) {
            scope.$watch('user.password', function (value) {
                //scope.user.passwordStrength = !value || value.length === 0 ? 0 : typeof zxcvbn !== "undefined" ? zxcvbn(value).score : 0;
                scope.user.passwordStrength = value == undefined ? 0 : zxcvbn(value).score;

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

directives.directive('ensureUnique', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {
            console.log(scope.user.username);
            scope.$watch(attrs.ngModel, function() {
                $http({
                    method: 'POST',
                    url: '/api/v1/check/' + scope.user.username,
                    data: {'username': scope.user.username}
                }).success(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', data.isUnique);
                    }).error(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', false);
                    });
            });
        }
    }
});

directives.directive('ngFocus', function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = true;
                });
            }).bind('blur', function(evt) {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function() {
                        ctrl.$focused = false;
                    });
                });
        }
    }
});













