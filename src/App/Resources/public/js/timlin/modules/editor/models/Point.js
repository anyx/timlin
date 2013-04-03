define(['backbone'], function(Backbone) {
    
    return Backbone.Model.extend({
        getDate: function() {
            return new Date();
        }
    });

    return Point;
});