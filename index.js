'use strict';

var View        = require('cloud/lib/parce/lib/view')
,   Rest        = require('cloud/lib/parce/lib/rest/index')
,   Validator   = require('cloud/lib/parce/lib/validator')
,   Base64      = require('cloud/lib/parce/lib/base64')
,   ObjectId    = require('cloud/lib/parce/lib/objectId');

module.exports = {
    View:       View,
    Rest:       Rest,
    Validate:   Validator,
    Base64: Base64,
    ObjectId: ObjectId
};
