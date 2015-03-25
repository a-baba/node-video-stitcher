define(['$component','libs/player'], function (app,VideoPlayer){

    app.directive('videojs', function(){

        return {

            link: function (scope, element,attrs) {

                new VideoPlayer(element,scope.videoId,{baseUrl:document.location.origin,format:attrs.videojs,env:'dev'});
            }
        };
    });

});
