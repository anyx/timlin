define(['marionette', 'Layout', 'models/Timeline'], function(Marionette, Layout, TimelineModel) {

    var app = new Marionette.Application();

    app.on("initialize:after", function(options){
        if (Backbone.history) {
            Backbone.history.start();
        }
    });
    
       var timeline = new TimelineModel();
       
       var fetchDeffered = timeline.fetch();
       
       fetchDeffered.done(function(){
            app.layout.show(new Layout({
                app         : this,
                model       : timeline
            }));
       });
       
       fetchDeffered.fail(function(){
           alert('bad');
       })
    });

    app.on('start', function(options) {
        this.addRegions({
            layout: options.container
        });
    });

    return app;
});