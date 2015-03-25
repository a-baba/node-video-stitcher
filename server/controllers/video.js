define(['$db','$ffmpeg/index','$queue','fs.extra','cuid','fs','libs/utils'],function($db,$ffmpeg,$queue,$fs,cuid,fs,$utils){

    var Video = function(){};

    Video.prototype.get = function(req,res){

        $db.videos.$findAll(function(videos){

            res.json(videos);
        });
    };

    Video.prototype.create = function(req,res){

        var jobs = [];

        for(var i = 0; i < req.body.length; i++)
            jobs.push({func:$ffmpeg,args:req.body[i]});

        new $queue(jobs,4,function(results){

            res.json(results);
        });
    };

    Video.prototype.delete = function(req,res){

        var location = process.cwd()+'/server/assets/audi/created/'+req.params.videoId;

        $db.videos.$remove({videoId:req.params.videoId},function(){

            console.log('removing folder for',location);

            $utils.recursiveDelete(location);

            res.json({worked:true});
        });
    };

    return Video;
});
