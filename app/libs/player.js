(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.b);
    }
}(this, function (exports, b) {

    console.log(b); // * have to use b in some way.

    var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

    function $getPos(el) {
        // yay readability
        for(var lx=0, ly=0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {x: lx,y: ly};
    }

    function $style(css) {

        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }

    function $extend(obj, props) {
        for(var prop in props) {
            if(props.hasOwnProperty(prop)) {
                obj[prop] = props[prop];
            }
        }
    }

    function $isMobile(){

        var check = false;

        (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);

        return check;
    }

    function $bandwidth(cnt,src,size,done){

        var bandwidth = 0;

        var i = 0;

        var start = new Date().getTime();

        (function rec() {

            var img = new Image();

            img.onload = function(){

                var end = new Date().getTime();

                bandwidth += Number(((size / (((end - start) / 2)/ 1000))));

                i++;

                if (i < cnt) {

                    start = new Date().getTime();

                    rec();
                }
                else {

                    bandwidth = bandwidth / cnt;

                    console.log('bandwidth',bandwidth.toFixed(0));

                    done(bandwidth.toFixed(0));
                }
            };

            img.src =  src+'?'+start;

        })();
    }

    // attach properties to the exports object to define
    // the exported module properties.
   // exports.VideoPlayer = function(element,videoId,vidOpts,spinOpts){

    window.VideoPlayer = function(element,videoId,vidOpts,spinOpts){

        if(jQuery === undefined || $ === undefined)
            console.error('jquery is required for this library to work.');

        if(videojs === undefined)
            console.error('video.js is required for this library to work.');

        if(Spinner === undefined)
            console.error('spin.js is required for this library to work.');

        if(typeof element === 'string')
            element = $(element);

        var pos         = $getPos(element[0]);
        var player      = false;
        var spinner     = false;
        var source      = false;
        var $width      = false;
        var $height     = false;
        var $video      = false;
        var isMobile    = $isMobile();
        var $playBtn    = false;
        var $ctrlBar    = false;
        var $container  = $(element);
        var $poster     = $('<div class="videojs-poster"></div>');

        // video.js setup options
        var vidOptions = {

            env               : 'prod',
            format            : false,

            defaultColor      : '#e5e8e7',                                // sets vjs-default-skin color
            baseUrl           : 'http://devnginx01.thefactery.com:3000',  // base url for stitcher server

            posterUrl         : '/server/assets/audi/images/posters/play_button.png',       // default poster image
            posterSize        : '25%',                                    // poster background size
            posterPosition    : '50% 50%',                                // poster background position

            progressPlayed    : '#c03',                                  // progress played bar color
            progressLoaded    : '#b0b6b8',                               // progress loaded bar color

            mobileBuffer      : 1000,                                   // duration for setTimeout on autoplay
            bandwidthAttempts : 3,                                      // # of times image is pulled from server to check bandwidth
            bandwidthUrl      : '/server/assets/audi/images/bandwidth.png',  // image on stitcher server used to check bandwidth
            bandwidthSize     : 372,                                   // size of image (kb) used to test bandwidth.
            swfUrl            : '/app/libs/videojs/video.swf',          // swf location for videojs

            volume            : 0,
            aspectRatio       : 9/16,                                     // aspect ratio used to calculate proper height of player
            background        : '#000'                                    // background color of the video /object element
        };

        // spinner.js options
        var spinOptions = {

            top       : '50%',
            left      : '50%',
            color     : '#c03',      // color of spinner
            lines     : 17,          // # of lines
            length    : 15,          // length of lines
            width     : 4,           // width of lines
            radius    : 16,          // radius of lines
            corners   : 0.6,         // corners of lines
            rotate    : 0,           // rotate spinner
            trail     : 100,         // trailing length
            speed     : 1.2,         // speed of spinner
            direction : 1,           // 1 = clockwise, 2 = counterclockwise
            boxShadow : false,       // boxshadow on spinner
            hwaccel   : true         // use hardware acceleration
        };

        if(vidOpts)
            $extend(vidOptions,vidOpts);

        if(spinOpts)
            $extend(spinOptions,spinOpts);

        $style('.vjs-default-skin{ color: '+vidOptions.defaultColor+'}.vjs-progress-control{ background: '+vidOptions.progressLoaded+' !important; }.vjs-play-progress{ background: '+vidOptions.progressPlayed+' !important; }video::-webkit-media-controls-start-playback-button{display:none;}.vjs-big-play-button{display:none !important;}');

        videojs.options.flash.swf           =  vidOptions.baseUrl  + vidOptions.swfUrl;

        $poster[0].style.background         = 'url('+vidOptions.baseUrl + vidOptions.posterUrl+') '+vidOptions.posterPosition+' no-repeat';
        $poster[0].style.backgroundSize     =  vidOptions.posterSize;
        $poster[0].style.position           = 'absolute';
        $poster[0].style.top                =  pos.y +'x';
        $poster[0].style.zIndex             = '9999';
        $poster[0].style.cursor             = 'pointer';

        $container[0].style.background      = vidOptions.background;


        var formats = {

            hls : {
                type :  iOS ? 'application/vnd.apple.mpegurl' : 'video/mp4',
                src  :  function(bitrate,videoId){

                    return vidOptions.baseUrl+'/stream/hls/'+ bitrate +'/'+$width+'/'+$height+'/'+  videoId +'.m3u8'
                }
            },
            mp4 :{
                type :  'video/mp4',
                src  :  function(bitrate,videoId){

                    return vidOptions.baseUrl+'/stream/mp4/'+ bitrate +'/'+$width+'/'+$height+'/'+  videoId +'.mp4'
                }
            },
            webm :{
                //type :  'video/webm;codecs="vp9"',
                type :  'video/webm',
                src  :  function(bitrate,videoId){

                    return vidOptions.baseUrl+'/stream/webm/'+ bitrate +'/'+$width+'/'+$height+'/'+  videoId +'.webm'
                }
            },
            ogg :{
                type :  'video/ogg',
                src  :  function(bitrate,videoId){

                    return vidOptions.baseUrl+'/stream/ogg/'+ bitrate +'/'+$width+'/'+$height+'/'+ videoId +'.ogg'
                }
            },
            flv :{
                type :  'video/flv',
                src  :  function(bitrate,videoId){

                    return vidOptions.baseUrl+'/stream/flv/'+ bitrate +'/'+$width+'/'+$height+'/'+ videoId +'.flv'
                }
            },
            rtmp: {
                type: 'rtmp/flv',
                src: function(bitrate,videoId){

                    return 'rtmp://devnginx01.thefactery.com:1935/live/'+videoId;
                }
            }
        };

        function sources(videoId,bitrate){

            if(!vidOptions.format){

                if(isMobile && iOS || isMobile){

                    return {

                        type: formats.hls.type,
                        src: formats.hls.src(bitrate,videoId)
                    }
                }

                if(!isMobile){

                    return {

                        type: formats.flv.type,
                        src: formats.flv.src(bitrate,videoId)
                    }
                }

            }else{

                return{

                    type: formats[vidOptions.format].type,
                    src: formats[vidOptions.format].src(bitrate,videoId)
                }
            }

        }

        function createPlayer(element, bitrate){

            var id = 'videoId'+Math.floor((Math.random() * 100) + 1);

            source = sources(videoId,bitrate);

            var setup = {

                techOrder : ['flash', 'html5'],
                controls  : 'true',
                preload   : 'auto',
                autoplay  : 'true',
                children: { loadingSpinner: false }  // hides the default spinner
            };

            if(isMobile){

                setup.techOrder =  ['html5','flash'];

                delete setup.autoplay;
            }

            if(vidOptions.format === 'mp4'){

                setup.techOrder = ['html5','flash'];
            }

            $video = $('<video id="'+id+'" class="video-js vjs-default-skin" data-setup="{}"></video>');

            element.append($video);

            element[0].parentElement.style.position = 'relative';

            return videojs(id, setup, function(){

                resize();

                var $player = this;

                $player.volume(vidOptions.env === 'prod' ? vidOptions.volume : 0 );

                $player.src(source);

                $video.css('opacity',1);

                if(isMobile){

                    setTimeout(function(){

                        $player.play();

                    },vidOptions.mobileBuffer);

                }else{

                    $player.play();
                }

                $playBtn = $('.vjs-play-control');
                $ctrlBar = $('.vjs-control-bar');

                $player.on('play',function(){

                    $video.css('opacity',1);
                    $poster.hide();
                    spinner.stop();
                    //$video.css('opacity',1);
                });

                $player.on('pause',function(){

                    $video.css('opacity',0);
                    $poster.show();
                });

                $player.on('ended',function(){

                    $video.css('opacity',0);
                    $poster.show();
                    $player.currentTime(0);

                    if(isMobile)
                       $player.exitFullscreen();

                    //$video.css('opacity',0);

                    $player.pause();
                });

                // seems to crash flashls, only use when mobile.
                if(isMobile) {

                    // 1. once player starts.
                    $player.on('loadstart',function(){

                        console.log('loadstart',arguments);
                    });

                    // 2. once playlist is loaded.
                    $player.on('loadedmetadata',function(){

                        console.log('loadedmetadata',arguments);
                    });

                    // 3. - called multiple times / fragment.
                    $player.on('loadeddata', function(){

                        console.log('loadeddata!', arguments);
                    });
                }
            });
        }

        $bandwidth(vidOptions.bandwidthAttempts,vidOptions.baseUrl + vidOptions.bandwidthUrl,vidOptions.bandwidthSize, function (bitrate) {

            $container.append($poster);

            $poster.show();

            $poster.on($isMobile() ? 'touchstart' : 'click',function(){

                $poster.hide();

                spinner = new Spinner(spinOptions).spin(element[0]);

                // todo:: get this working.
                //if(vidOptions.format && vidOptions.format == 'rtmp'){
                //
                //    $.getJSON('/stream/rtmp/'+bitrate+'/'+videoId).success(function(){
                //
                //        if (!player){
                //
                //            player = createPlayer(element,bitrate);
                //
                //        }else{
                //
                //            isMobile ?
                //                player.play() :
                //                player.src(source);
                //        }
                //    });
                //
                //}else {

                    if (!player) {

                        player = createPlayer(element, bitrate);

                    } else {

                        isMobile ?
                            player.play() :
                            player.src(source);
                    }
                //}
            });
        });

        function resize(){

            var div = $('video');

            $video = div.length > 0 ? div : $('object');

            pos = $getPos(element[0]);

            $width = $container.width();

            $height = $width * vidOptions.aspectRatio;

            $poster.width($width).height($height);

            $container.height($height);

            if($video){

                $video.width($width).height($height);

                $video.parent().width($width).height($height);
            }
        }

        window.onresize = resize;

        resize();
    };


    return window.VideoPlayer;
}));

