define(['$db','fs','$configs/network','$ffmpeg/command','growing-file','libs/utils','q','zlib'],function($db,fs,network,$ffmpeg,fileReader,$utils,$q,zlib){

    var HLS = function(){};

    // '/stream/hls/:bitrate/:width/:height/:videoId.*'

    HLS.prototype.init = function(req,res){

        var $this = this;

        $db.videos.$find({videoId: req.params.videoId},function(video){

            !video.processed ?

                $this.media(req,res,video) :

                $this.manifest(req,res,video,true);
        });
    };

    // /stream/hls/:bitrate/:width/:height/:videoId.m3u8

    HLS.prototype.manifest = function(req,res,video,exists){

        console.log('requesting manifest');

        res.writeHead(206, { 'Transfer-Encoding':'chunked', 'Content-Type': 'application/x-mpegURL' });

        var link = './server/assets/'+video.brandId+'/created/'+video.videoId+'.'+req.params[0];

        var file = exists ?
                    fs.createReadStream(link,{buffer:2 * 1024}) :
                    fileReader.open(link,{offset:150,interval:150,timeout:2500});

        file.pipe(res);
    };


    HLS.prototype.media = function(req,res,video){

        var $this = this;

       // video.processed = true;

        new $ffmpeg(video, req.params);

        $db.videos.$update({videoId:video.videoId},video,function(){

            $this.manifest(req,res,video,false);
        });
    };


    // /stream/hls/:bitrate/:width/:height/:videoId/playlist.m3u8

    HLS.prototype.playlist = function(req,res){

        console.log('requesting playlist');

        res.writeHead(206,{

              'Content-Type': 'application/x-mpegURL',
              'Transfer-Encoding':'chunked'
        });

        $db.videos.$find({videoId: req.params.videoId},function(video){

            fs.readFile('./server/assets/'+video.brandId+'/created/'+req.params.videoId+'/playlist.m3u8',function(err,data){

                if (err)
                    throw err;

                res.write(data.toString());

                res.end();
            });
        });
    };

    // /stream/hls/:bitrate/:width/:height/:videoId/:file.ts

    HLS.prototype.segment = function(req,res){

        console.log('requesting segment');

        $db.videos.$find({videoId: req.params.videoId},function(video){

            res.writeHead(200,{
                'Transfer-Encoding' : 'chunked',
                'Content-Type'      : 'video/MP2T',
                'Content-Encoding'  : 'gzip'
            });

            var path = '/server/assets/'+video.brandId+'/created/'+video.videoId+'/'+req.params.file+'.ts';

            var file = fs.createReadStream('.'+path,{ bufferSize: 64 * 1024});

            var gzip = file.pipe(zlib.createGzip());

                gzip.pipe(res);

                file.on('error',function(err){

                    console.log('read error',err);

                    res.end();
                });
        });
    };


    return HLS;
});
