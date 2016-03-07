'use strict';

angular.module('twitterapp', ['ngRoute']).config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })
        .otherwise({
            redirectTo: '/'
        });
});