define(['$db','$ffmpeg/command','$presets/webm'],function($db,$ffmpeg,$presets){

    var Webm = function(){};

    // '/stream/webm/:bitrate/:videoId.*'

    Webm.prototype.init = function(req,res){

        console.log('webm stream initializing');

        $db.videos.$find({videoId: req.params.videoId},function(video){

            var _ffmpeg = new $ffmpeg(video, req.params);

            res.writeHead(200, $presets.headers);

            _ffmpeg.stdout.pipe(res);
        });
    };

    return Webm;
});
