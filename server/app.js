define(['express',
        'express-session',
        'express-useragent',
        'cookie-parser',
        'body-parser',
        'underscore-node',
        '$configs/rest',
        '$configs/views',
        '$configs/express',
        '$promise!$mongodb',
        '$db',
        'q'],
        function(express,session,userAgent,cookieParser,bodyParser,_,$rest,$views,$configs,$mongodb,$db,$q){

    var defer = $q.defer();

    var app = express();

    app.use(function (req, res, next) {

        // TODO::  fix this hood ass shit.
        if(req.url.slice(-2) == 'ts' || req.url.slice(-4) == 'm3u8'){
            next();
        }else{
            app.use( express.static( $configs.EXPRESS_BASE ) );
            next();
        }
    });

    app.use( userAgent.express() );

    app.use( cookieParser() );

    app.use( bodyParser.json() );       // to support JSON-encoded bodies

    app.use( bodyParser.urlencoded({extended: true}) ); // to support URL-encoded bodies

    app.use( express.static($configs.EXPRESS_APP_FOLDER) );

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    var viewRoute = function(path,file){

        app.get(path,function(req,res){

            res.sendFile(file,{root: $configs.EXPRESS_BASE});
        });
    };

    var restRoute = function(method,path,controller,controllerMethod){

        app[method](path,function(req,res,next){

            require(['$controllers/'+controller],function(controller){

                new controller()[controllerMethod](new cleanParams(req),res,next);
            });
        });
    };

    var cleanParams = function(req){

        if(req.params.size() > 0)
           req.params.clean();

        if(req.query.size() > 0)
           req.query.clean();

        return req;
    };

    $db.setConnection($mongodb).then(function(){

        // Register REST ROUTES
        for(var i = 0; i < $rest.length; i++)
            new restRoute($rest[i].method,$rest[i].path,$rest[i].controller,$rest[i].controllerMethod);

        // Register VIEW ROUTES
        for(var v = 0; v < $views.length; v++)
            new viewRoute($views[v].path,$views[v].file);

        defer.resolve(app);
    });

    app.close = function(){

        $db.close();
    };

    return defer.promise;
});
