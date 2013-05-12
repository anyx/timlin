define(['backbone'], function(Backbone){
    
    var EntityManager = function() {
        this.initialize.apply(this, arguments)
    };
    
    _.extend(EntityManager.prototype, Backbone.Events, {
        
        collections: {},
        
        registerCollection: function(name, collection) {
            this.collections[name] = collection;
        },
        
        hasCollection: function(name) {
            return name in this.collections;
        },
        
        getCollection: function(name) {
            if (!this.hasCollection(name)) {
                throw new Error('Collection "'+name+'" is not registered');
            }
            return this.collections[name];
        },
        
        createEntity: function(collectionName, modelAttributes, deferred, options) {
            var options = options || {};
            var createOptions = {
                success: function() {
                    deferred.resolve.apply(deferred, arguments);
                },
                error: function() {
                    deferred.reject.apply(deferred, arguments);
                }
            };
            _.extend(createOptions, options);
            
            return this.getCollection(collectionName).create(modelAttributes, createOptions);
        },
        
        fetch: function(collectionName, entityId) {
            var collection = this.getCollection(collectionName);
            var entity = new collection.model({id: entityId});
            entity.collection = collection;
            
            var resultDeferred = new $.Deferred();
            
            var fetchDeferred = entity.fetch();
            fetchDeferred
                .done(function() {
                    var resultArguments = _.toArray(arguments);
                    resultArguments.push(entity);

                    resultDeferred.resolve.apply(resultDeferred, resultArguments);
                })
                .fail(function(){
                    var resultArguments = _.toArray(arguments);
                    resultArguments.push(entity);

                    resultDeferred.reject.apply(resultDeferred, resultArguments);
                })
            return resultDeferred.promise();
        },
        
        initialize: function() {}
        
    });
    
    return EntityManager
    
})