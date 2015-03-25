define(['fs-extra'],function($fs){

    return function(template,bitrate,width,height){

        var directory = process.cwd()+'/server/assets/'+template.brandId+'/created/'+template.videoId;

        $fs.ensureDirSync(directory);

        var playlist = directory+'/playlist.m3u8';

        if(bitrate > 600)
           bitrate = 600;

        console.log('bitrate requested:',bitrate);

        // TESTING!!! (works, but has no live support?);
        // -b:v '+template.video.bitrates[b].bitrate+'
        // -crf 18
        // -profile:v baseline

        // outputs += '-map 0:a -c:a copy -c:v libx264 -f flv rtmp://localhost/stream/'+template.videoId;
        //outputs += '-map 0:a -c:a copy -c:v libx264 -b:a 64k -ac 2 -ar 44100 -b:v '+template.video.bitrates[b].bitrate+' -crf 18 -bufsize '+(parseFloat(template.video.bitrates[b].bitrate)*1)+'k -maxrate '+template.video.bitrates[b].bitrate+' -force_key_frames 25 -r 25 -g 25 -map [out'+b+'] -hls_time 2 -hls_allow_cache 1 -hls_segment_filename '+directory+'/%01d.ts '+playlist+' ';
        //return  '-map 0:a -c:a copy -c:v libx264 -b:a 64k -ac 2 -ar 44100 -b:v '+bitrate+'k -crf 18 -bufsize '+(parseFloat(bitrate))+'k -maxrate '+(parseFloat(bitrate)*2)+'k -force_key_frames 25 -r 25 -g 50 -map [final] -hls_time 2 -hls_allow_cache 1 -hls_segment_filename '+directory+'/%01d.ts '+playlist+'';

        // WORKING!!!
        //outputs += '-map 0:a -c:a copy -c:v libx264 -crf 18 -profile:v baseline -maxrate '+template.video.bitrates[b].bitrate+' -bufsize '+template.video.bitrates[b].bitrate+' -map [out'+b+'] -force_key_frames 25 -r 25 -flags -global_header -f segment -segment_time 2 -segment_list_flags +live -segment_list_type m3u8 -segment_list '+playlist+' -segment_format mpegts '+directory+'/%01d.ts ';

        //-b:v '+bitrate+'k

        // -segment_list_flags -cache+live
        //var cmd = '-map 0:a -map [final] -c:a copy -ac 1 -ar 44100 -c:v libx264 -crf 23 -b:a 64k -b:v '+(bitrate * 0.8)+'k -maxrate '+(bitrate * 1.6)+'k -bufsize '+(bitrate * 1.6)+'k -preset ultrafast -threads 1 -tune zerolatency -force_key_frames 23.976024 -r 23.976024 -g 23.976024 ';
        //var cmd = '-map 0:a -c:a copy -ac 1 -ar 44100 -c:v libx264 -b:a 64k -b:v '+(bitrate * 0.75)+'k -crf 18 -maxrate '+(bitrate * 1.5)+'k -bufsize '+(bitrate * 1.5)+'k -map [final] -preset ultrafast -threads 0 -tune zerolatency -force_key_frames 25 -r 25 -g 50 -flags -global_header ';

        var cmd =  '-c:a copy -ac 1 -ar 44100 -c:v libx264 -crf 23 -b:a 64k -bt '+(bitrate * 0.8)+'k -b '+(bitrate * 0.4)+'k -preset ultrafast -threads 1 -tune zerolatency -force_key_frames 25 -r 25 -g 25 -flags -global_header ';
            cmd += '-f segment -segment_time 1 -segment_list_flags -cache+live -segment_list_type m3u8 -segment_list '+playlist+' -segment_format mpegts '+directory+'/%01d.ts';
        //}

        // return '-map 0:a -c:a libfdk_aac -c:v libx264 -ac 1 -ar 44100 -map [final] -tune zerolatency -preset ultrafast -threads 0 -r 25 -f flv rtmp://localhost:1935/stream/'+template.videoId+'';
        // return '-map 0:a -c:a copy -c:v libx264 -ac 2 -ar 44100 -b:v '+bitrate+'k -maxrate '+bitrate+'k -bufsize '+bitrate+'k -map [final] -threads 2 '+process.cwd()+'/server/assets/'+template.brandId+'/created/'+template.videoId+'.'+format;

        //return outputs.substring(0,outputs.length - 1);

        return cmd;

    }

});
