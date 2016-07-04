'use strict';

var Model       = require('cloud/lib/parce/lib/rest/model')
,   Controller  = require('cloud/lib/parce/lib/rest/controller');

String.prototype.toDashCase = function(){
    return this.replace(
        /\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}
    ).replace(/^-/, "");
}

var Rest = function(_name, _app, _validator, _cloud){

    var _route      = _name.route ? _name.route.toDashCase() : _name.toDashCase()
    ,   _function   = _name.route ? _name.route : _name
    ,   controller = new Controller(
        _name.class ? _name.class : _name , _validator
    );

    _app.get('/' + _route +'/:id'		, controller.find);
    _app.get('/' + _route    			, controller.list);
    _app.post('/' + _route			    , controller.create);
    _app.put('/' + _route  + '/:id'	    , controller.update);
    _app.delete('/'+ _route +'/:id'	    , controller.remove);

    if(_cloud){
        Parse.Cloud.define(_function + 'Find', controller.find);
        Parse.Cloud.define(_function + 'List', controller.list);
        Parse.Cloud.define(_function + 'Create', controller.create);
        Parse.Cloud.define(_function + 'Update', controller.update);
        Parse.Cloud.define(_function + 'Remove', controller.remove);
    }

};

Rest.prototype.Model      = Model;
Rest.prototype.Controller = Controller;

module.exports = Rest;
