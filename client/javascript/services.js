var services = angular.module('myApp.services', ['ngResource', 'ngCookies'])

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
            return $resource('/v1/todolist', {}, actions);
        }      
    ])

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
            return $resource('/v1/todolist', {}, actions);
        }      
    ])

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
                signup: function (username, email, password1, password2) {
                    var that = this;
                    $http.post('/api/v1/signup', {username: username, password: password1, password2: password2, email: email}).success(function (data) {
                        that.currentUser = data.user;
                        that.isSignupShown = false;
                        that.isLogoutShown = true;
                        $location.path('/todo');
                    });
                },
                isLogoutShown: false,
                logout: function () {
                    var that = this;
                    $http.post('/logout').success(function () {
                        that.isLogoutShown = false;
                        that.currentUser = {};
                        $location.path('/');
                    })
                },
                isAuthenticated: function () {
                    return !!this.currentUser;
                },
            };
        }
    );





