var services = angular.module('myApp.services', ['ngResource'])

services.factory('Login', ['$resource', '$http',
        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'}
                }; 
            return $resource('/dmz/login', {}, actions);
        }      
    ])

services.factory('Signup', ['$resource', '$http',
        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'}
                }; 
            return $resource('/dmz/signup', {}, actions);
        }      
    ])

services.factory('Security', ['$location', 'Login', 'Signup', function ($location, Login, Signup) {
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
                    var that = this;
                    Login.save({}, {username: username, password: password}, function (res) {
                        that.currentUser = res.user;
                        if (that.isAuthenticated()) {
                            that.isLoginShown = false;
                        }
                    });
                },
                signup: function (username, email, password1, password2) {
                    var that = this;
                    Signup.save({}, {username: username, password: password1, password2: password2, email: email}, function (res) {
                        that.currentUser = res.user;
                        if (that.isAuthenticated()) {
                            that.isSignupShown = false;
                        }
                    });
                },
                logout: function () {
                    delete this.currentUser;
                },
                isAuthenticated: function () {
                    return !!this.currentUser;
                },
            };
        }
    ]);

/*
signup: function (username, email, password1, password2) {
    var request = $http.post('/dmz/signup', {username: username, password: password1, password2: password2, email: email});
    return request.then(function (response) {
        security.currentUser = response.data.user;
        if (security.isAuthenticated()) {
            security.isSignupShown = false;
        }
    });
}
*/


/*
login: function (username, password) {
    var request = $http.post('/dmz/login', {username: username, password: password});
    return request.then(function (response) {
        security.currentUser = response.data.user;
        if (security.isAuthenticated()) {
            security.isLoginShown = false;
        }
    });
},
*/



