define(['angularAMD'], function (app) {

    //'use strict';

    app.controller('controllers/create',['$scope', '$http',function($scope, $http) {

        $scope.request = function(){

            $http.post('/video',JSON.parse($scope.data.replace(/\r?\n/g, ''))).success(function(response){

                $scope.response = JSON.stringify(response);

            }).error(function(error){

                $scope.response = JSON.stringify(error);
            });
        };

    }]);
});
