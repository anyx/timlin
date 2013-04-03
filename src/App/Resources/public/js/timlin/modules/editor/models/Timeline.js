define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        
        initialize  : function(options) {
        },
        
        addPoint    : function(point) {
            this.get('points').add(point);
        }
    })
})