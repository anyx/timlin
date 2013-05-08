define(['backbone', 'module'], function(Backbone, module) {
    return Backbone.Model.extend({

        url: module.config().url,

        initialize  : function(options) {
        },
        
        addPoint    : function(point) {
            this.get('points').add(point);
        }
    })
})