'use strict';

module.exports = function(className, objectId){
    return {
        "__type": "Pointer",
        "className": className,
        "objectId": objectId
    };
}
