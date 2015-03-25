define(['angularAMD'], function (app) {

    'use strict';

    app.controller('controllers/services',['$scope', '$state','$http',function($scope, $state,$http) {

        console.log('service controller started');

        $http.get('/services').success(function(data){

            console.log(data);
            $scope.services = data;
        });
    }]);
});
