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



