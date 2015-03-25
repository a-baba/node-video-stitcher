define(['angularAMD'], function (app) {

    'use strict';

    app.controller('controllers/mediasource',['$scope', '$http','$stateParams','$q',function($scope, $http, $stateParams,$q) {

        $scope.videoId  = $stateParams.videoId;

        var video,
            req = new XMLHttpRequest();
        // initialize video.js
        video = videojs('video');
        // the flash-based media sources implementation only supports FLV video data
        // use XMLHttpRequest2 to get the raw byte array of an example FLV

        ///stream/flv/:bitrate/:videoId.*
        req.open('GET', 'http://devnginx01.thefactery.com:3000/stream/flv/900/'+$scope.videoId+'.flv', true);

        req.responseType = 'arraybuffer';

        req.onload = function(event){
            var
            // create a new media source to hold the data buffers
                mediaSource = new videojs.MediaSource(),
            // wrap the arraybuffer in a view so we can easily work with the
            // individual bytes
                bytes = new Uint8Array(req.response),
                url;
            // when a media source is assigned to a video element the `sourceopen`
            // event fires
            mediaSource.addEventListener('sourceopen', function(event){
                // construct the video data buffer and set the appropriate MIME type
                var sourceBuffer = mediaSource.addSourceBuffer('video/flv; codecs="vp6,aac"');
                // start feeding bytes to the buffer
                // the video element that is reading from the associated media buffer is
                // ready to start playing now
                sourceBuffer.appendBuffer(bytes, video);
            }, false);
            // to assign a media source to a video element, you have to create a URL for it
            url = videojs.URL.createObjectURL(mediaSource);
            // assign the media source URL to video.js
            video.src({
                src: url,
                type: "video/flv"
            });
        };
        req.send(null);

    }]);
});
