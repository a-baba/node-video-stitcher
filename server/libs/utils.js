define(function(require){


    var _ = require('underscore-node');

    var fs = require('fs');

    return {

        recursiveDelete : function(path) {

            var $this = this;

            if( fs.existsSync(path) ) {

                fs.readdirSync(path).forEach(function(file,index){
                    var curPath = path + "/" + file;

                    if(fs.lstatSync(curPath).isDirectory()) { // recurse

                        $this.recursiveDelete(curPath);
                    } else { // delete file

                        fs.unlinkSync(curPath);
                    }
                });

                fs.rmdirSync(path);
            }
        },

        template:function(text,collection){

            var $this = this;

            return text.replace(/\{\{(.*?)\}\}/g, function (match, token) {

                return $this.map(collection,token) || '';
            });
        },
        findBraces: function(path,first){

            var results = [], re = /\{\{(.*?)\}\}/g, text;

            while(text = re.exec(path)){

                if(first){

                    var _split = text[1].split('.');

                    if(results.indexOf(_split[0]) == -1)
                        results.push(_split[0]);
                }else{
                    text = text[1];
                    results.push(text);
                }
            }

            // console.log('findBraces',results);

            return results;
        },

        replaceText: function(x,request) {

            if(x === undefined)
                return false;

            if (typeof x == "object") {

                if(x.length){
                    for(var i = 0; i < x.length; i++)
                        this.replaceText(x[i],request);

                } else {

                    for (var attr in x) {

                        if(_.isArray(x[attr]) || _.isObject(x[attr])){

                            this.replaceText(x[attr],request)

                        }else{

                            if(this.findBraces(x[attr]).length > 0){

                                x[attr] = this.template(x[attr],request);

                                console.log(x[attr]);
                            }

                        }
                    }
                }
            }
        },

        map : function(obj,keys, value) {

            if(obj == undefined){
                console.log('ERROR',1,obj,keys,value);
                return;
            }

            if (typeof keys == 'string'){
                if(keys.split('.'))
                    return this.map(obj,keys.split('.'), value);
                else
                    return obj[keys];
            }
            else if (keys.length==1 && value!==undefined){

                if(_.isArray(obj[keys[0]]))
                    obj[keys[0]].push(value);
                else{

                    if(obj[keys[0]] == undefined){
                        console.log('ERROR',2,obj,keys[0]);
                        return;
                    }

                    obj[keys[0]] = value;
                }

                return obj[keys[0]];
            }

            else if (keys.length==0)
                return obj;
            else{

                var next;

                var spli = keys[0].split('[');

                var object = spli[0];
                var ind = spli[1];

                if(spli[1] !== undefined){

                    // console.log('testing for array ',object,ind,ind.substring(0,ind.length -1));
                    next = obj[object][ind.substring(0,ind.length -1)];
                }
                else
                    next = obj[keys[0]];

                return next ? this.map(next,keys.slice(1), value) : false;
            }
        },
        convert: {

            fromMilitaryTime : function(value) {

                if (value !== null && value !== undefined){ //If value is passed in
                    if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
                        return value;
                    }
                    else {
                        if(value.length == 8){ //If value is the expected length for military time then process to standard time.
                            var hour = value.substring ( 0,2 ); //Extract hour

                            var minutes = value.substring ( 3,5 ); //Extract minutes

                            var identifier = 'AM'; //Initialize AM PM identifier

                            if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
                                identifier = 'PM';
                            }
                            if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
                                hour=12;
                            }
                            if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
                                hour = hour - 12;
                                identifier='PM';
                            }
//                    if(parseFloat(hour) < 10){
//                        hour = hour.substring(1);
//                    }
                            if(hour[0] == '0')
                                hour = hour.substring(1);

                            return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
                        }
                        else { //If value is not the expected length than just return the value as is
                            return value;
                        }
                    }
                }
            },
            fromIntToWeekday:function(n){

                var Days = ['M ','TU','W ','TH','F ','SA','SU'];

                return Days[n];

            }
        },

        $mask : {

            phone: function(element){
                element.mask("(999) 999-9999")
            },
            postal: function(element){
                element.mask("99999?-9999");
            }
        },

        mask: {

            phone: function(phone){

                phone = phone.replace(/[^0-9]/g, '');
                phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

                return phone;
            },
            postal : function(postal) {

                var strip;
                if(postal.length == 5)
                    strip = true;

                postal = postal.replace(/[^0-9]/g, '');
                postal = postal.replace(/(\d{5})(\d{4})/, "$1-$2");


                if(strip)
                    postal.substring(0, postal.length - 1);

                return postal;
            }
        },

        unmask: {

            phone : function(phone) {

                phone = phone.replace(/[^0-9]/g, '');
                phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1$2$3");
                return phone;
            },
            postal : function(postal) {

                postal = postal.replace(/[^0-9]/g, '');
                postal = postal.replace(/(\d{5})(\d{4})/, "$1$2");
                return postal;
            }
        },

        sortByKey: function(array, key) {

            return array.sort(function(a, b) {

                var x = a[key];
                var y = b[key];

                if (typeof x == "string")
                {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },
        sort : function(property){

            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        },
        clean : function(obj) {

            for (var key in obj) {
                if (typeof obj[key] == "object")
                    this.clean(obj[key]);
                else if (typeof obj[key] == 'array')
                    for(var i = 0; i < obj[key].length; i++)
                        this.clean(obj[key][i])
                else if (typeof obj[key] != "function"){

                    if(key == '$$hashKey')
                        delete obj[key];

                    if(key == 'PhoneNumber'){
                        //     console.log('reformatting number');
                        obj[key] = this.unmask.phone(obj[key]);
                    }
                }
            }
        },
        notIn : function(list,range){

            var choices = _.range(range);
            var available = [];

            for(var i = 0; i < choices.length; i++)
                if(!list.contains(choices[i]))
                    available.push(choices[i]);

            return available;
        },

        capitalizeFirst: function(s){

            return s && s[0].toUpperCase() + s.slice(1);
        }
    }
});
