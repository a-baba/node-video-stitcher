define(
    ['require','$db','$configs/network','$configs/fonts','$commands/index','child_process','$configs/express'],
    function(require,$db,network,fonts,commands,child_process,$configs){

    return function(template,params){


        var bitrate   = params.bitrate;
        var format    = params['0'];
        var width     = params.width;
        var height    = params.height;
        var spawn     = child_process.spawn;
        var $command  = [];
        var $drawtext = '';
        var $fps      = 25;
        var $filters  = '';
        var $i        = 0;
        var $cat      = -1;
        var $offset   = 1;
        var $audio    = false;

        // takes the complete command line and splits the arguments by space; makes it child.spawn compliant
        function cutArgs(cmd){

            var cuts;

            if(typeof cmd === 'string')
                cuts = cmd.split(' ');
            else if( typeof cmd === 'object')
                cuts = cmd;

            for(var s = 0; s < cuts.length; s++){
                $command.push(cuts[s]);
            }
        }


        function movie(mov){

            return '-re -i '+network.cwd+mov.src+' -itsoffset '+$offset;
       //    return '-re -i '+network.cwd+mov.src+' -itsoffset '+$offset;
        }

        function audio(mp3){

            if(mp3)
               $audio = true;

            return '-i '+network.cwd+mp3.src+'';
        }


        function image(img){

            return '-f image2 -loop 1 -i '+network.cwd+img.src+'';
        }

        function movFilter(mov){

            return mov.hasOwnProperty('displayStart') ?
                    '['+$i+':v]fade=in:'+(mov.displayStart * $fps)+':'+(mov.fadeIn * $fps)+':alpha=1,fade=out:'+(mov.displayEnd * $fps)+':'+(mov.fadeOut * $fps)+':alpha=1[img'+$i+'];' :
                    '['+$i+':v][mov'+$i+'];';
        }

        function imgFilter(img){

            var size = '';
            var fade = '';

            if(img.width && img.height)
                size += 'scale='+img.width+':'+img.height+'';

            if(img.fade)
                fade += 'fade=in:'+(img.displayStart * $fps)+':'+(img.fadeIn * $fps)+':alpha=1,fade=out:'+(img.displayEnd * $fps)+':'+(img.fadeOut * $fps)+':alpha=1';

            return  '['+$i+':v]'+(size + (fade ? ',' : ''))+fade+'[img'+($i - 1)+'];';
        }

        function txtFilter(txt){

            var drawtext = 'drawtext=';

            drawtext += 'fontfile='+(fonts[txt.fontFamily])+':';
            drawtext += "text='"+txt.text+"':";
            drawtext += 'fontsize='+txt.fontSize+':';
            drawtext += 'fontcolor='+txt.fontColor+':';

            switch(txt.textAlign){
                case 'left' :   drawtext += 'x='+txt.x+':';
                    break;
                case 'rigt' :   drawtext += 'x='+txt.x+'-(text_w\\\\)\\\\:';
                    break;
                case 'center' : drawtext += 'x='+txt.x+'-(text_w/2\\\\)\\\\:';
                    break;
            }

            drawtext += 'y='+txt.y+':';

            if(txt.shadowColor){

                drawtext +='shadowcolor='+txt.shadowColor+':';
                drawtext +='shadowx='+txt.shadowX+':';
                drawtext +='shadowy='+txt.shadowY+':';
            }

            drawtext += "fontcolor_expr="+txt.fontColor+"%{eif\\\\:clip(255*(1*between(t\\,"+txt.displayStart+"+"+txt.fadeIn+"\\,"+txt.displayEnd+"-"+txt.fadeOut+")+((t-"+txt.displayStart+")/"+txt.fadeIn+")*between(t\\,"+txt.displayStart+"\\,"+txt.displayStart+"+"+txt.fadeIn+")+(-(t-"+txt.displayEnd+"\\\\)/"+txt.fadeOut+")*between(t\\,"+txt.displayEnd+"-"+txt.fadeOut+"\\,"+txt.displayEnd+"))\\,0\\,255)\\\\:x\\\\:2},";

            return drawtext;
        }

        function concat(c,img){

            $cat++;

            return c == 0 ?
            '['+c+':v][img'+(c)+']overlay='+img.x+':'+img.y+':shortest=1[cat'+c+'];' :
            '[cat'+(c)+'][img'+(c)+']overlay='+img.x+':'+img.y+':shortest=1[cat'+c+'];';
        }

        function finalize(bitrate){

            var cmd = '-map 0:a -map [final] ';
            //var cmd = '-map 0:a -map [final] -s '+Math.round(parseFloat(width))+'x'+Math.round(parseFloat(height))+' ';

            switch(format){
                case 'm3u8': cmd += commands[template.format](template,bitrate,Math.round(parseFloat(width)),Math.round(parseFloat(height)));
                    break;
                default:     cmd += commands[format](template,bitrate,Math.round(parseFloat(width)),Math.round(parseFloat(height)));
                    break;
            }

            return cmd;
        }

        if(template.video.movies)
            for(var m = 0; m < template.video.movies.length; m++){
                cutArgs(movie(template.video.movies[m]));
                $i++;
            }

        if(template.video.images)
            for(var i = 0; i < template.video.images.length; i++){
                cutArgs(image(template.video.images[i]));
                $filters += imgFilter(template.video.images[i]);
                $i++;
            }

        if(template.video.audios)
            for(var a = 0; a < template.video.audios.length; a++){
                cutArgs(audio(template.video.audios[a]));
                $i++;
            }

        if(template.video.texts)
            for(var t = 0; t < template.video.texts.length; t++){
                $drawtext+=txtFilter(template.video.texts[t]);
            }

        if(template.video.images)
            for(var c = 0; c < template.video.images.length; c++){
                $filters += concat(c,template.video.images[c]);
            }

        $drawtext = $drawtext.substring(0,$drawtext.length - 1);

        var rates = '[final]split='+template.video.bitrates.length;

        for(var b = 0; b < template.video.bitrates.length; b++){
            rates += '[out'+b+']';
        }

        cutArgs(['-filter_complex',''+$filters+'[cat'+$cat+']'+$drawtext+'[final]']);

        cutArgs(finalize(bitrate));

        var proc = spawn('ffmpeg',$command);

//        if($configs.env === 'DEV')
           proc.stderr.on('data',function(data){

                console.log(data.toString());
           });

        return proc;

       // var $convert = 'convert ' + template.directory + "video.gif -coalesce -gravity NorthWest -draw 'image over " + template.preview.button.x + "," + template.preview.button.y + " 0,0 " + '"' + ( process.cwd() + template.preview.button.src ) + '"' + "' -layers Optimize " + template.directory + 'video.gif';

       // var $gifify = 'gifify ' + template.directory + 'video.mp4 -o ' + template.directory + 'video.gif --from ' + template.preview.from + ' --to ' + template.preview.to + ' --resize ' + template.preview.size
    }
});
