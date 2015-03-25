define(['$db','$ffmpeg/command'],function($db,$ffmpeg){

    var Rtmp = function(){};

    // '/stream/rtmp/:bitrate/:videoId.*'

    Rtmp.prototype.init = function(req,res){

        console.log('rtmp stream initializing');

        $db.videos.$find({videoId: req.params.videoId},function(video){

            new $ffmpeg(video, req.params);

            res.json({url:'rtmp://devnginx01.thefactery.com:1935/live/'+req.params.videoId});
        });
    };

    return Rtmp;
});
