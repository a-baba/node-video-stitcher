define(['$configs/network'],function(network){

    return function(template,bitrate,width,height){

        if(bitrate > 600)
           bitrate = 600;

        console.log('bitrate requested:',bitrate);

        var cmd =  '-c:a copy -b:a 128k -ac 1 -ar 44100 -c:v libx264 ';
            cmd += '-crf 23 -b:v '+(bitrate * 0.8)+'k -maxrate '+(bitrate * 0.8)+'k -rtmp_buffer '+(bitrate * 0.8)+' -rtmp_live +live ';
            cmd += '-pix_fmt yuv420p -g 50 -preset ultrafast -threads 1 -tune zerolatency -flv_metadata 1 ';
            cmd += '-f flv rtmp://12.0.0.1:1935/live/'+template.videoId;

        console.log(cmd);

        return cmd;
    }
});
