var requirejs = require('requirejs');


/// lets see if this works.
requirejs.config({

    nodeRequire: require,

    basePath: './',

    paths:{

        '$controllers' : 'controllers',
        '$models'      : 'models',
        'routes'       : 'routes',
        '$configs'     : 'configs',
        '$db'          : 'libs/db',
        '$promise'      :'libs/promise',
        '$mongodb'     : 'libs/mongodb',
        '$ffmpeg'      : 'libs/ffmpeg',
        '$queue'       : 'libs/queue',
        'libs/utils'   : 'libs/utils',
        '$templates'   : 'libs/ffmpeg/templates',
        '$commands'    : 'libs/ffmpeg/commands',
        '$presets'     : 'libs/ffmpeg/presets'
        //'$class'       : 'libs/prototype/class',
        //'$svg'         : 'libs/svg/svg',
        //'svg/animation': 'libs/svg/modules/animation',
        //'svg/easing'   : 'libs/svg/modules/easing',
        //'svg/text'     : 'libs/svg/modules/text',
        //'svg/x2js'     : 'libs/svg/x2js'
    }
});

requirejs(['require','http','libs/prototype/object','libs/prototype/string','cluster','os','libs/network','$configs/network'],function (require,http,objects,strings,cluster,os,network,networkConfigs) {

    var server;

    if(cluster.isMaster){

        var cpu = os.cpus();

        // Create a worker for each CPU
        for (var i = 0; i < cpu.length; i += 1)
            cluster.fork();

        // Listen for dying workers
        cluster.on('exit', function (worker) {
            // Replace the dead worker, we're not sentimental
            console.log('Worker ' + worker.id + ' died :(');

            cluster.fork();
        });

    }else{

        require(['$promise!app'],function(app){

            server = http.createServer(app);

            process.on('SIGTERM', function () {

                console.log("Closing Server");

                server.close();
            });

            server.on('close', function () {

                console.log("Server Closed! \n Closing MongoDB Connections");

                app.close();
            });

            try {
                server.listen(3000,function(){

                    // save network settings to configs.
                    network(function(address){

                        networkConfigs.ip       = address;
                        networkConfigs.port     = server.address().port;
                        networkConfigs.protocol = 'http';
                        networkConfigs.address  = networkConfigs.protocol +'://' + networkConfigs.ip + ':' + networkConfigs.port;
                        networkConfigs.cwd      = process.cwd();

                        networkConfigs.getNetworkPath = function(path){

                            return this.address+(path || '');
                        };

                        networkConfigs.getRelative = function(path){

                            return path.replace(this.cwd,'')
                        };

                        networkConfigs.getRelativePath = function(path){

                            return path.replace(this.cwd,this.protocol+'://'+this.ip+':'+this.port)
                        };
                    });

                    console.log('ffmpeg server running @ http://localhost:3000/'+'  w/ worker id: '+cluster.worker.id);
                });
            }
            catch(err){

                console.error("Error: [%s] Call: [%s]", err.message, err.syscall);
            }
        });
    }
});
