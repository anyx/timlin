define(['app', './Point'], function(App, PointModel) {
    
    var Collection = Backbone.Collection.extend({
        
        model:  PointModel, 
        
        url: function () {
            return 'asd';
        },
        
        render: function() {
        }
    });
    
    return Collection;
});