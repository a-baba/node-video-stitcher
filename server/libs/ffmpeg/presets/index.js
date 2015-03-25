define(['$presets/hls','$presets/mp4','$presets/ogg','$presets/webm','$preset/flv','$presets/rtmp'],function(hls,mp4,ogg,webm,flv,rtmp){

    var presets = {};

        presets.hls   = hls;
        presets.mp4   = mp4;
        presets.ogg   = ogg;
        presets.flv   = flv;
        presets.rtmp  = rtmp;
        presets.webm  = webm;

    return presets;

});
