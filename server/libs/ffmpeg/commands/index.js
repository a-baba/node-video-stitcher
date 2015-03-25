define(['$commands/hls','$commands/mp4','$commands/ogg','$commands/webm','$commands/flv','$commands/rtmp'],function(hls,mp4,ogg,webm,flv,rtmp){

    var commands = {};

        commands.hls   = hls;
        commands.mp4   = mp4;
        commands.ogg   = ogg;
        commands.flv   = flv;
        commands.webm  = webm;
        commands.rtmp  = rtmp;


    return commands;
});
