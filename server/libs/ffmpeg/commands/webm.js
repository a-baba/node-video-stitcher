define(['fs-extra'],function($fs){

    return function(template,bitrate,width,height){

        var directory = process.cwd()+'/server/assets/'+template.brandId+'/created/'+template.videoId;

        $fs.ensureDirSync(directory);

        if(bitrate > 600)
           bitrate = 600;

        console.log('bitrate requested:',bitrate);

        var cmd =  '-c:a libvorbis -c:v libvpx ';
            cmd += '-qmin 10 -qmax 40 -crf 18 ';
            cmd += '-b:a 64k -b:v '+(bitrate * 0.8)+'k ';
            cmd += '-preset ultrafast -threads 1 -tune zerolatency ';
            cmd += '-f webm pipe:1';

        return cmd;
    }
});
