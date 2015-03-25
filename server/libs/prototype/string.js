define(function(){

    String.prototype.chunk = function(n) {

        return this.match(new RegExp('\\w[\\s\\S]{1,'+n+'}\\b|\w[\\s\\S]{1,'+n+'}','g'));
    };
});
