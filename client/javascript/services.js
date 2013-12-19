var services = angular.module('myApp.services', ['ngResource', 'ngCookies']);

services.config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('errorHttpInterceptor');
});

services.factory('Todo', ['$resource', '$http',
    function ($resource) {
        var actions = {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'query': {method: 'GET', isArray: true},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'},
            'update': {method: 'PUT'}
        };
        return $resource('/api/v1/todolist', {}, actions);
    }
]);

services.factory('TodoList', ['$resource', '$http', 'Security',
    function ($resource) {
        var actions = {
            'get': {method: 'GET'},
            'save': {method: 'POST'},
            'query': {method: 'GET', isArray: true},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'},
            'update': {method: 'PUT'}
        };
        return $resource('/api/v1/todolist/:id', {}, actions);
    }
]);

services.factory('Security', function ($location, $cookieStore, $http) {

        var user = $cookieStore.get('user') || {username: '', email: ''};

        $cookieStore.remove('user');

        return {
            currentUser: user,
            showLogin: function () {
                this.isSignupShown = false;
                this.isLoginShown = true;
            },
            isLoginShown: false,
            showSignup: function () {
                this.isLoginShown = false;
                this.isSignupShown = true;
            },
            isSignupShown: false,
            login: function (username, password) {
                var that = this;
                $http.post('/api/v1/login', {username: username, password: password}).success(function (data) {
                    that.currentUser = data.user;
                    that.isLoginShown = false;
                    that.isLogoutShown = true;
                    $location.path('/todo');
                });
            },
            signup: function (user) {
                var that = this;
                $http.post('/api/v1/signup', user).success(function (data) {
                    that.currentUser = data.user;
                    that.isSignupShown = false;
                    that.isLogoutShown = true;
                    $location.path('/todo');
                });
            },
            isLogoutShown: false,
            logout: function () {
                var that = this;
                $http.post('/api/logout').success(function () {
                    that.isLogoutShown = false;
                    that.currentUser = {};
                    $location.path('/');
                });
            },
            isAuthenticated: function () {
                return !!this.currentUser.username;
            },
        };
    }
);

services.factory('ErrorService', function () {
    return {
        errorMessage: null,
        setError: function (msg) {
            this.errorMessage = msg;
        },
        clear: function () {
            this.errorMessage = null;
        }
    };
});

services.factory('errorHttpInterceptor', function ($q, $location, ErrorService, $rootScope) {
    return function (promise) {
        return promise.then(function (response) {
            return response;
        }, function (response) {
            if (response.status === 401) {
                //$rootScope.$broadcast('event:LoginRequired');
                ErrorService.setError('Wrong username and/or password... Please try again!!')
            } else if (response.status >= 400 && response.status <= 500) {
                ErrorService.setError('Server was unable to find' +
                    ' what u were looking for... Sorry!!');
            }
            return $q.reject(response);
        });
    };
});





