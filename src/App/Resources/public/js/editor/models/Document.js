define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        
        getVersions: function() {
            return this.versions;
        }
    });
});