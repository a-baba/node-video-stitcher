define(['$db','$ffmpeg/command','$presets/mp4'],function($db,$ffmpeg,$presets){

    var Mp4 = function(){};

    // '/stream/mp4/:bitrate/:videoId.*'

    Mp4.prototype.init = function(req,res){

        console.log('mp4 stream initializing');

        $db.videos.$find({videoId: req.params.videoId},function(video){

            var _ffmpeg = new $ffmpeg(video, req.params);

            res.writeHead(200,$presets.headers);

            _ffmpeg.stdout.pipe(res);
        });
    };

    return Mp4;
});
