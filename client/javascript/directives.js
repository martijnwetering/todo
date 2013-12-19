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
            var pass1 = '';
            var pass2 = '';
            scope.$watch('user.password', function (value) {
                pass1 = value;
                scope.user.passwordStrength = value == undefined ? 0 : typeof zxcvbn !== undefined ? zxcvbn(value).score : 0;
                scope.passwordEqual = pass1 == pass2 && pass1 != undefined && pass2 != undefined;
            });
            scope.$watch('user.password2', function (value) {
                pass2 = value;
                scope.passwordEqual = pass1 == pass2 && pass1 != undefined && pass2 != undefined;
            });
        }
    }
});

directives.directive('alertBar', function ($parse) {
    return {
        restrict: 'A',
        template: '<div class="alert alert-error alert-bar"' +
            'data-ng-show="errorMessage">' +
            '<button type="button" class="close" data-ng-click="hideAlert()">' +
            'x</button>' +
            '{{errorMessage}}</div>',
        controller: function ($scope, Security, ErrorService) {
            $scope.security = Security;
            $scope.errorService = ErrorService;
        },
        link: function (scope, elem, attrs) {
            var alertMessageAttr = attrs['alertmessage'];
            scope.errorMessage = null;

            scope.$watch(alertMessageAttr, function (data) {
                scope.errorMessage = data;
            });

            scope.hideAlert = function () {
                scope.errorMessage = null;
                $parse(alertMessageAttr).assign(scope, null);
            };
        }
    };
});

directives.directive('checkIfUsernameIsUnique', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                $http({
                    method: 'POST',
                    url: '/api/v1/check/' + scope.user.username,
                    data: {'username': scope.user.username}
                }).success(function (data, status, headers, cfg) {
                        ctrl.$setValidity('unique', data.isUnique);
                    }).error(function (data, status, headers, cfg) {
                        ctrl.$setValidity('unique', false);
                    });
            });
        }
    }
});

directives.directive('ngFocus', function () {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus',function (evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function () {
                    ctrl.$focused = true;
                });
            }).bind('blur', function (evt) {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = false;
                    });
                });
        }
    }
});













