define(['require','$db','fs-extra','libs/utils','$templates/index'],
    function(require,$db,$fs,utils,$templates){

        return function(template,callback){

            $fs.ensureDirSync(template.directory);

            utils.replaceText(template.video,template.request);

            if($templates[template.format])
               $templates[template.format](template);

            var pkg = {

                format     : template.format,
                videoId    : template.$id,
                templateId : template.templateId,
                video      : template.video,
                brandId    : template.brandId
            };

            function buildCB (template){

                var cb = {

                    VideoPath     : template.href + template.$id,
                    TemplateId    : template.templateId
                };

                // 1. merge original request body with response body
                for(var i in template.request){
                    if(template.callback.body.hasOwnProperty(i))
                        cb[i] = template.request[i];
                }

                return cb;
            }


            $db.videos.$insert(pkg,function(){

                console.log('inserted new record');

                callback(buildCB(template));
            });
        }
    });
