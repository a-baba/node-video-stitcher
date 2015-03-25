define(['mongodb','$configs/mongodb','q'],function(mongodb,$configs,$q){

    var defer = $q.defer();

    mongodb.MongoClient.connect($configs.MONGODB_URL, function(err, db) {

        console.log("Connected correctly to server");

        defer.resolve(db);
    });

    return defer.promise;
});
