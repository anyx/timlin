define(['backbone', 'module'], function(Backbone, module) {
    return Backbone.Model.extend({

        _url: module.config().url,
        
        url : function() {
            return this._url + this.id;
        },
        
        initialize  : function(options) {
        },
        
        addPoint    : function(point) {
            this.get('points').add(point);
        }
    })
})