define(['q'],function($q){

    return{

        $db     : null,
        $active : null,

        setConnection: function(connection){

            var defer = $q.defer();

            var $this = this;

            this.$db = connection;

            this.$db.collections(function(err,collections){

                if(err) throw err;

                for(var i = 0; i < collections.length; i++){
                    $this[collections[i].collectionName] = $this.getInstance(collections[i]);
                }

                defer.resolve()
            });

            return defer.promise;
        },

        getInstance: function(collection){

            var Instance = function(collection){

                this.$insert = function(documents,cb){

                    if(!cb)
                        var defer = $q.defer();


                    collection.insert(documents instanceof Array ? documents : [documents],function(err,result){

                        if(err) throw err;

                        if(cb)
                            cb(result.length == 1 ? result[0] : result);
                        else
                            defer.resolve(result.length == 1 ? result[0] : result);
                    });

                    if(!cb)
                        return defer.promise;
                };

                this.$update  = function(id,body,cb){

                    if(!cb)
                        var defer = $q.defer();

                    collection.update(id,body,{upsert:true},function(err,result){

                        if(err) throw err;

                        if(cb)
                            cb(result.length == 1 ? result[0] : result);
                        else
                            defer.resolve(result.length == 1 ? result[0] : result);
                    });

                    if(!cb)
                        return defer.promise;
                };

                this.$remove = function(document,cb){

                    collection.remove(document,function(err,result){

                        if(err) throw err;

                        cb(result);
                    });
                };

                this.$find = function(args,cb){

                    if(!cb)
                       var defer = $q.defer();

                    collection.find(args).toArray(function(err,result){

                        if(err) throw err;

                        if(result.length == 1)
                            result = result[0];

                        if(cb)
                        cb(result);
                        else
                        defer.resolve(result);
                    });

                    if(!cb)
                       return defer.promise;
                };

                this.$findAll = function(cb){

                    if(!cb)
                        var defer = $q.defer();

                    collection.find({}).toArray(function(err,result){

                        if(err) throw err;

                        if(cb)
                            cb(result);
                        else
                            defer.resolve(result);
                    });

                    if(!cb)
                        return defer.promise;
                };

                return this;
            };

            return new Instance(collection);
        }
    }
});
