define(function(){

    return function(template,bitrate,width,height){

       // 500 - 800
        if(bitrate > 900)
           bitrate = 900;

        console.log('bitrate requested:',bitrate);

        var cmd =  '-c:a copy -b:a 128k -ac 1 -ar 44100 -c:v libx264 ';
            cmd += '-crf 23 -b:v '+(bitrate * 0.8)+'k -maxrate '+(bitrate * 0.8)+'k -bufsize '+(bitrate * 0.8)+'k ';
            cmd += '-pix_fmt yuv420p -g 25 -preset ultrafast -threads 1 -tune zerolatency ';
            cmd += '-f flv pipe:1';

        console.log('FFMPEG -> FLV',cmd);

        return cmd;
    }
});
