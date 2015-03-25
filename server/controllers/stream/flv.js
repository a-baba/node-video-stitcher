define(['$db','$ffmpeg/command','$presets/flv','zlib'],
    function($db,$ffmpeg,$presets,zlib){

    // '/stream/flv/:bitrate/:videoId.*'

    var Flv = function(){};

    Flv.prototype.init = function(req,res){

        console.log('rtmp stream initializing',req.params);

        $db.videos.$find({videoId: req.params.videoId},function(video){

            var _ffmpeg = new $ffmpeg(video, req.params);

            res.writeHead(206,$presets.headers);

            var gzip = _ffmpeg.stdout.pipe(zlib.createGzip());

            gzip.pipe(res);
        });
    };

    return Flv;
});
