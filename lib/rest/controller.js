'use strict';

var Model = require('cloud/lib/parce/lib/rest/model')
,   View  = require('cloud/lib/parce/lib/view')
,   Validator = require('cloud/lib/parce/lib/validator');

module.exports = function(_entity, _validator){

    var model = new Model(_entity);

    this.find = function(req, res){

        View.JSON(
            res, model.find(req.params.id)
        );
    };

    this.list = function(req, res){

        View.JSON(
            res, model.list(
                req.params.limit,
                req.params.skip
            )
        );
    };

    this.create = function(req, res){

        Validator(_validator, req.body).then(function(data){

            View.JSON(
                res, model.create(data)
            );
        },
        function(error){
            res.status(400).send(error);
        });

    };

    this.update = function(req, res){

        Validator(_validator, req.body).then(function(data){
            View.JSON(
                res, model.update(
                    req.params.id, data
                )
            );
        },
        function(error){
            res.status(400).send(error);
        });

    };

    this.remove = function(req, res){

        View.JSON(
            res, model.remove(
                req.params.id
            )
        );
    };
};
