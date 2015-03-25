define(['$db','$ffmpeg/command','$presets/ogg'],function($db,$ffmpeg,$presets){

    var Ogg = function(){};

    // '/stream/ogg/:bitrate/:videoId.*'

    Ogg.prototype.init = function(req,res){

        console.log('Ogg stream initializing');

        $db.videos.$find({videoId: req.params.videoId},function(video){

            var _ffmpeg = new $ffmpeg(video, req.params);

            res.writeHead(206,$presets.headers);

            _ffmpeg.stdout.pipe(res);
        });
    };

    return Ogg;
});
