define(['backbone', './Timeline', 'module'], function(Backbone, Timeline, module) {
    return Backbone.Collection.extend({

        model: Timeline,

        url : module.config().url,
        
        initialize  : function(options) {
        }
    })
})