
define(['$component'], function (app) {

    app.filter('toUpperCase', function() {

        return function(input) {

            return input.toUpperCase();

        };
    });

    app.filter('trimAttr', function() {

        return function(input) {

            return input.substring(1,(input.length));

        };
    });


    app.filter('toJSON',function(){

        return function(input){

            return JSON.stringify(input, undefined, 4);
        }
    });

    app.filter('timeClock', function() {

        return function(input) {

            var hours = Math.floor(input / 36e5),
                mins = Math.floor((input % 36e5) / 6e4),
                secs = Math.floor((input % 6e4) / 1000);

            return (!isNaN(hours) ? (hours < 10 ? '0'+hours : hours) : '00')+':'+(!isNaN(mins)? (mins < 10 ? '0'+mins : mins) : '00')+':'+(!isNaN(secs) ? (secs < 10 ? '0'+secs : secs) : '00');
        };
    });
});
