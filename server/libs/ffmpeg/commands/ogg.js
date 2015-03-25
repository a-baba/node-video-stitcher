define(function(){

    return function(template,bitrate,width,height){
        //
        //var directory = process.cwd()+'/server/assets/'+template.brandId+'/created/'+template.videoId;
        //
        //$fs.ensureDirSync(directory);



        if(bitrate > 600)
           bitrate = 600;

        console.log('bitrate requested:',bitrate);

        var cmd = '-c:a libvorbis -c:v libtheora -b:a 64k -b:v '+(bitrate * 0.9)+'k -preset ultrafast -threads 1 -tune zerolatency ';
        cmd += '-f ogg pipe:1';

        return cmd;
    }
});
