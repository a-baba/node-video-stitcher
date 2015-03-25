define(['angularAMD'], function (app) {

    'use strict';

    app.controller('controllers/stream',['$scope', '$http','$stateParams','$q',function($scope, $http, $stateParams,$q) {

        $scope.videoId  = $stateParams.videoId;
        $scope.format   = $stateParams.format;

    }]);
});
