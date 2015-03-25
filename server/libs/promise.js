define(function () {

   // 'use strict';

    var isPromise;

    isPromise = function (obj) {

        if (!obj || typeof obj !== 'object')
            return false;

        return typeof obj.then === 'function';
    };

    return {

        load: function (name, req, load) {

            req([name], function (result) {

                var onReject, onResolve, complete;

                onReject = function () {

                    load.error.apply(null, arguments);
                };

                onResolve = function () {

                    load.apply(null, arguments);
                };

                if (isPromise(result)) {

                    complete = result.done || result.then;

                    if (typeof result.catch === 'function') {

                        complete.call(result, onResolve);

                        result.catch(onReject);

                    } else {

                        complete.call(result, onResolve, onReject);
                    }

                } else {

                    load(result);
                }
            });
        }
    };
});
