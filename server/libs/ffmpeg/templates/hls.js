define(['fs'],function(fs){

    //function childM3u8(){
    //
    //    //for(var b = 0; b < template.video.bitrates.length; b++){
    //
    //        //$fs.ensureDirSync(template.directory+template.video.bitrates[b].bitrate+'/');
    //
    //       // var m3u8 = '#EXTM3U\r\n'+
    //       //     '#EXT-X-VERSION:'+template.video.extm3u8.version+'\r\n'+
    //       //     '#EXT-X-MEDIA-SEQUENCE:'+template.video.extm3u8.mediaSequence+'\r\n'+
    //       //     '#EXT-X-TARGETDURATION:'+template.video.extm3u8.targetDuration+'\r\n';
    //       //
    //       // for(var s = 0; s < template.video.extm3u8.inf.length; s++){
    //       //
    //       //     m3u8 += '#EXTINF:'+template.video.extm3u8.inf[s].duration+',\r\n';
    //       //     m3u8 += template.video.extm3u8.inf[s].file+'\r\n';
    //       // }
    //       //
    //       //     m3u8 += '#EXT-X-ENDLIST';
    //       //
    //       //fs.writeFileSync(template.directory+'playlist.m3u8',m3u8);
    //    //}
    //}

    //childM3u8();


    return function(template){

        var m3u8 = '#EXTM3U\r\n\r\n'+
            '#EXT-X-ALLOW-CACHE:YES\r\n\r\n'+
            '#EXT-X-PLAYLIST-TYPE:EVENT\r\n\r\n';

        /// todo:: make this work based on bandwidths listed in template.

        for(var b = 0; b < 1; b++)
            m3u8 += '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH='+template.video.bitrates[b].bandwidth+',RESOLUTION='+template.video.bitrates[b].resolution+'\r\n'+template.$id + '/playlist.m3u8\r\n\r\n';

        fs.writeFileSync(process.cwd()+'/server/assets/'+template.brandId+'/created/'+template.$id+'.m3u8',m3u8);
    }
});
