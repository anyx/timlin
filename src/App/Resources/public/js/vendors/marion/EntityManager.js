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
        
        initialize: function() {}
        
    });
    
    return EntityManager
    
})