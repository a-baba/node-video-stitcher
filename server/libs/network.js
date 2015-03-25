define(['os','dns'],function(os,dns){

    return function(cb) {

        dns.lookup(os.hostname(), function (err, address, family) {

            if(err)
                throw err;

            cb(address,family);
        });
    };
});
