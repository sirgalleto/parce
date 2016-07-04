'use strict';

var moment      = require('cloud/lib/moment/moment-timezone.min.js')
,   objectId    = require('cloud/lib/parce/lib/objectId');

var validators = {
    Number: function(value){
        return typeof Number(value) == 'number';
    },
    String: function(value){
        return typeof value == 'string';
    },
    Date: function(value){
        return typeof value == 'string';
    },
    GeoPoint: function(value){
        return typeof value == 'object';
    },
    Object: function(value){
        return typeof value == 'object';
    }
};

var transforms = {
    Date: function(value){
        return moment(new Date(value)).utc();
    },
    GeoPoint: function(value){
        return new Parse.GeoPoint({
            latitude: Number(value.latitude),
            longitude: Number(value.longitude)
        });
    },
    Pointer: function(id, params){
        return objectId(params.className, id);
    }
};

module.exports = function(rules, values){

    var promise = new Parse.Promise()
    ,   isValid = true;

    for(var x in rules){
        var rule = rules[x];

        if(values && values[x]){
            var value = values[x];

            if(rule.transform){
                if(rule.transform && rule.transform.action){
                    values[x] = rule.transform.action(value, rule.transform);
                }
                else{
                    values[x] = transforms[rule.transform.name || rule.transform](value, rule.transform);
                }
            }

            if(validators[rule.type]){
                var validation = validators[rule.type](value);

                if(!validation){
                    promise.reject(
                        'Invalid type of ' + x + ', expected ' + rule.type.toLowerCase() + ' and you got ' + typeof value
                    );
                    isValid = false;
                    break;
                }
            }
        }
        else{
            if(rules.required){
                promise.reject(
                    x + ' is required'
                )
            }
        }
    }



    if(isValid){
        promise.resolve(values);
    }

    return promise;
};
