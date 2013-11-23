var services = angular.module('myApp.services', ['ngResource'])

// Al put, post, update and delete request get done true this factory
services.factory('User', ['$resource', '$http',
        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'}
                }; 
            console.log('User service accessed');
            return $resource('/dmz/login', {}, actions);
        }      
    ])

services.factory('Security', ['$location', function ($location) {
            return {
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
                    this.currentUser = {username: username, email: username+"@example.com" };
                    this.isLoginShown = false;
                },
                signup: function (username, email, password1, password2) {
                    this.currentUser = {username: username, email: email};
                    this.isSignupShown = false;
                },
                logout: function () {
                    delete this.currentUser;
                },
                isAuthenticated: function () {
                    return !!this.currentUser;
                }
            };
        }
    ]);



