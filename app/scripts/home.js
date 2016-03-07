'use strict';

angular.module('twitterapp').controller("HomeCtrl", function($scope, $http) {
    $scope.searchTwitter = function(search) {
        var requestOptions = {
            method: "GET",
            params: {
                q: search,
                result_type: "recent"
            },
            url: "http://localhost:3000/twitter/tweets"
        }
        $http(requestOptions).then(function success(response) {
                $scope.tweets = response.data.statuses;
            },
            function error(response) {
                alert("Bad Reponse!");
            });

    };
});