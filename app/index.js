/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
requirejs.config({

    paths: {

        '$app'            : 'app',
        '$routes'         : 'configs/routes',
        'angular'         : 'bower_components/angular/angular.min',
        'angularAMD'      : 'bower_components/angularAMD/angularAMD.min',
        'ngAnimate'       : 'bower_components/angular-animate/angular-animate.min',
        'ngTouch'         : 'bower_components/angular-touch/angular-touch.min',
        'uiRouter'        : 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'jquery'          : 'bower_components/jquery/jquery.min',
        'jquery-migrate'  : 'bower_components/jquery/jquery-migrate.min',
        'gsap'            : 'bower_components/gsap/src/minified/jquery.gsap.min',
        'TweenMax'        : 'bower_components/gsap/src/minified/TweenMax.min',
        'bootstrap'       : 'bower_components/bootstrap/dist/js/bootstrap.min',
        '$components'     : 'configs/components',
        '$component'      : 'configs/component',
        'libs/svg/x2js'   : 'libs/x2js',
        'domready'        : 'libs/domready',
        'libs/utils'      : 'libs/utils',
        'libs/spin'       : 'libs/spin',
        'libs/svg/xml'    : '../server/libs/svg/pretty_xml',
        'libs/svg'        : '../server/libs/svg/svg',
        'svg/easing'      : '../server/libs/svg/modules/easing',
        'svg/text'        : '../server/libs/svg/modules/text',
        'svg/animation'   : '../server/libs/svg/modules/animation',
        //'libs/utils'      : '../server/libs/utils',
        'underscore-node' : '../server/node_modules/underscore-node/lib/underscore',
        '$class'          : '../server/libs/prototype/class',
        'xmldom'          : '../server/node_modules/xmldom/dom-parser'
        //'flowplayer'      : 'libs/flowplayer/flowplayer'
    },

    shim: {

        '$routes':{

            deps:['angularAMD'],
            exports:'$routes'
        },
        'angularAMD':{

            deps    : ['angular'],
            exports : 'angularAMD'
        },
        'bootstrap':{

            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'jquery-migrate':{

            deps: ['jquery'],
            exports: 'jquery'
        },
        'angular'   : {
            deps    :  ['jquery'],
            exports :   'angular'
        },

        'gsap':{
            deps:['jquery','TweenMax'],
            exports: 'gsap'
        },
        'ngAnimate' : {
            deps    :  ['angular'],
            exports :  'ngAnimate'
        },
        'uiRouter' : {
            deps    :  ['angular'],
            exports :  'uiRouter'
        },
        'ngTouch' : {
            deps    :  ['angular'],
            exports :  'ngTouch'
        }
        //'$app':{
        //
        //    deps:['angular','angularAMD','$routes','jquery','gsap','uiRouter','ngTouch','$components'],
        //    exports:'$app'
        //}
    }

    //deps: ['$app']
});



requirejs(['angular','angularAMD','$routes','jquery','gsap','uiRouter','ngTouch','$components','libs/eventListener','bootstrap'],function(ng,angularAMD,$routes){

    var app   = ng.module('app', ['ui.router','ngTouch','app.modules'],function(){});

    app.config(function( $stateProvider, $urlRouterProvider, $sceProvider ){

        $sceProvider.enabled(false);

        $urlRouterProvider.when('', '/');

        for(var i in $routes)
            $stateProvider.state(i,$routes[i]);

    }).run(['$rootScope',function($rootScope) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {

            $rootScope.toState       = toState;
            $rootScope.toStateParams = toStateParams;
        });
    }]);

    angularAMD.bootstrap(app);

    return app;
});


