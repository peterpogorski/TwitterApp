'use strict';

angular.module('twitterapp').controller("HomeCtrl", function($scope, $http, $location) {
    $scope.searchTwitter = function(search) {
        var requestOptions = {
            method: "GET",
            params: {
                q: search,
                result_type: "recent"
            },
            url: $location.protocol() + '://'+ $location.host() + ':' + $location.port() + '/twitter/tweets'
        }
        $http(requestOptions).then(function success(response) {
                $scope.tweets = response.data.statuses;
            },
            function error(response) {
                alert("Bad Reponse!");
            });

    };
});