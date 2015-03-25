define(function(require){

    return function(tasks,max,callback){

        var _q      = this;

        _q.promised = [];
        _q.queue    = 0;
        _q.tasks    = tasks;
        _q.max      = max;

        function construct(constructor, args) {
            function F() {
                return constructor.apply(this, args);
            }
            F.prototype = constructor.prototype;
            return new F();
        }

        _q.manager = setInterval(function(){

            var task = false;

            if(_q.tasks.length == 0 && _q.queue == 0)
                _q.complete();

            if(_q.queue > max)
                return;

            if(_q.queue < max)
                task = _q.tasks.shift();

            if(task){

                _q.exec(task);
                _q.queue++;
            }

        },100);

        _q.exec = function(task){

            if(!task.args.length)
                task.args = [task.args];

            task.args.push(_q.finished);

            construct(task.func,task.args);
        };

        _q.finished = function(results){

            _q.promised.push(arguments.length == 1 ? arguments[0] : arguments );

            _q.queue--;
        };

        _q.complete = function(){

            clearInterval(_q.manager);

            callback(_q.promised);
        };

        return _q;
    };
});
