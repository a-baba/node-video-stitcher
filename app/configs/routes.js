define(['angularAMD'],function(angularAMD){

    return {

        'base': {

            abstract: true,
            templateUrl: 'app/views/index.html'
        },
        'landing':{

            url: '/',
            parent:'base',
            data: {
                roles: []
            },
            views: {

                'page@base' : angularAMD.route({

                    templateUrl:   'app/views/landing.html',
                    controller:    'controllers/landing'

                })
            }

        },

        'stream': {

            url: '/stream/:format/:videoId',
            parent:'base',
            data: {
                roles: []
            },
            views: {

                'page@base' : angularAMD.route({

                    templateUrl:   'app/views/stream.html',
                    controller:    'controllers/stream'

                })
            }
        },


        // todo:: not working...
        //'mediasource': {
        //
        //    url: '/mediasource/:videoId',
        //    parent:'base',
        //    data: {
        //        roles: []
        //    },
        //    views: {
        //
        //        'page@base' : angularAMD.route({
        //
        //            templateUrl:   'app/views/mediasource.html',
        //            controller:    'controllers/mediasource'
        //
        //        })
        //    }
        //},

        'videos': {

            url: '/videos/:brandId',
            parent:'base',
            data: {
                roles: []
            },
            views: {

                'page@base' : angularAMD.route({

                    templateUrl:   'app/views/videos.html',
                    controller:    'controllers/videos'

                })
            }
        },
        'services':{
            url: '/services',
            parent:'base',
            data: {
                roles: []
            },
            views: {

                'page@base' : angularAMD.route({

                    templateUrl:   'app/views/services.html',
                    controller:    'controllers/services'

                })
            }
        },
        'create':{
            url: '/create',
            parent:'base',
            data: {
                roles: []
            },
            views: {

                'page@base' : angularAMD.route({

                    templateUrl:   'app/views/create.html',
                    controller:    'controllers/create'

                })
            }
        }
    };
});
