define(['backbone'], function(Backbone) {
    
    var Module = function(options) {
        
        this.application = null;
        
        this.getApplication = function() {
            return this.application;
        };
        
        this.setApplication = function(application) {
            this.application = application;
        };
        
        this.extend = function() {
            _.extend.apply(this, arguments);
            return this;
        }
    };
    
    return _.extend(Module.prototype, Backbone.Events);
});

