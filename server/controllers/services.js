define(['$db','$configs/rest','fs'],function($db,rest,fs){

    var Services = function(){};

        Services.prototype.get = function(req,res){

            console.log('services requested -> get');

            res.json(rest);
        };

    return Services;
});
