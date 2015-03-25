define(function(){

    return function(video,bitrate,width,height){

        // https://gist.github.com/deandob/9240090

        if(bitrate > 600)
           bitrate = 600;

        console.log('bitrate requested:',bitrate);

        var cmd =  '-c:a copy -ac 1 -ar 44100 -c:v libx264 -crf 23 -b:a 64k -bt '+(bitrate * 0.8)+'k -b '+(bitrate * 0.8)+'k -g 50 ';
            cmd += '-reset_timestamps 1 -movflags frag_keyframe+empty_moov -flags global_header -bsf:v dump_extra ';
            cmd += '-preset ultrafast -threads 1 -tune zerolatency -f mp4 -y pipe:1';

        return cmd;
    }

});
