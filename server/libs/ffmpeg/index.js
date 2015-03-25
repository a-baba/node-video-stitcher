define(['$ffmpeg/template','$db','$configs/network','cuid'],function($ffmpeg,$db,network,cuid){

    return function(request,callback){

        console.log('starting job');

        $db.templates.$find({ templateId:request.TemplateId },function(template){

            template.$id       = cuid();
            template.request   = request;
            template.directory = network.cwd + '/server/assets/'+template.brandId+'/created/'+template.$id+'/';

            new $ffmpeg(template,callback);
        });
    }
});
