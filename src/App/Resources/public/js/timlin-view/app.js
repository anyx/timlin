define(['marionette', 'layout', 'models/timeline' ], function(Marionette, Layout, TimelineModel) {
    
    var app = new Marionette.Application();
    
    app.addInitializer(function(){
        
    });
   
    app.on("initialize:after", function(options){
        if (Backbone.history) {
            Backbone.history.start();
        }
    });
    
    app.on('start', function(options) {
        
        var timeline = new TimelineModel({
            points : {}
        });
        
        app.addRegions({
            layout: options.container
        });
        app.layout.show(new Layout({timeline : timeline}));
    })
    
    return app;
});