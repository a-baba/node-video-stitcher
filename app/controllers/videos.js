define(['angularAMD'], function (app) {

    app.controller('controllers/videos',['$scope', '$http','$stateParams','$q',function($scope, $http, $stateParams,$q) {

        $http.get('/videos').success(function(videos){

            $scope.videos = videos;
        });

        $scope.remove = function($index){

            $http.delete('/videos/'+$scope.videos[$index].videoId).success(function(videos){

                if($index > -1)
                    $scope.videos.splice($index,1);
            });
        };

    }]);
});
