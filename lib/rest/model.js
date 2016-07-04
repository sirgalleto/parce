'use strict';

module.exports = function(_entity){
    var Entity = Parse.Object.extend(_entity);

    this.list = function(limit, skip){
        var query = new Parse.Query(Entity);

        query.limit(limit || 10);
        query.skip(skip || 0);

        return query.find();
    };

    this.find = function(id){
        var query = new Parse.Query(Entity);

        query.equalTo("objectId", id);

        return query.first();
    };

    this.create = function(data){
        var entity = new Entity();

        console.log('Data in model');
        console.log(data)

        if(data.date){
            data.date = new Date(data.date);
        }

        return entity.save(data);
    };

    this.update = function(id, data){

        var entity = new Entity();

        if(data.date){
            data.date = new Date(data.date);
        }

        return entity.save(data);
    };

    this.remove = function(id){
        var query = new Parse.Query(Entity);

        query.equalTo('objectId', id);

        return query.first().then(function(entity){
            return entity.destroy();
        });
    };
}
