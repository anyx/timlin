define(['marionette'], function(Marionette) {
    return Marionette.Controller.extend({
        
        application: null,
        
        getApplication: function() {
            return this.application
        },
        
        setApplication: function(application) {
            this.application = application;
        },
        
        showLayout: function(layout) {
            this.getApplication().layout.show(layout);
        }
    });
});

