define(function(){


    function isNumeric(num){
        return !isNaN(num)
    }

    Object.prototype.size = function() {
        var size = 0, key;
        for (key in this) {
            if (this.hasOwnProperty(key)) size++;
        }
        return size;
    };


    Object.prototype.clean = function(){

        var key;

        for (key in this) {

            if(isNumeric(this[key]))
               this[key] = parseFloat(this[key]);
        }

        return this;
    };

    //Object.prototype.$keys = function(){
    //
    //    var keys = [];
    //
    //    for(var k in this){
    //        if(k.slice( -3 ) == '_id'){
    //            keys.push({collection: k.slice(0,-3),id: k.slice(-3)});
    //        }
    //    }
    //
    //    return keys;
    //};
});
