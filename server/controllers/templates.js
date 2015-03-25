
define(['$db','cuid','fs'],function($db,cuid,fs){

    var Templates = function(){};

        Templates.prototype.all = function(req,res){

            $db.templates.$findAll(function(templates){

                res.json(templates);
            });
        };

        Templates.prototype.byBrand = function(req,res){

            $db.templates.$find(req.params,function(template){

                res.json(template);
            });
        };

        Templates.prototype.get = function(req,res){

            $db.templates.$find(req.params,function(template){

                res.json(template);
            });
        };

        Templates.prototype.save = function(req,res){

            fs.writeFile(process.cwd()+req.body.src,req.body.svg,function(){

                res.json({'response':1})
            });
        };


    return Templates;
});



