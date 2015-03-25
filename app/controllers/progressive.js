define(['angularAMD'], function (app) {

    'use strict';

    app.controller('controllers/progressive',['$scope', '$http','$stateParams','$q',function($scope, $http, $stateParams,$q) {

        $scope.videoId  = $stateParams.videoId;

    }]);
});
