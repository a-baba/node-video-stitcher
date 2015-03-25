define(['$db'],function($db){

    var Brands = function(){};

        Brands.prototype.get = function(req,res){

            $db.templates.$find([{},{brandId:req.params.brandId}],function(template){

                res.json(template);
            });
        };

    return Brands;
});



