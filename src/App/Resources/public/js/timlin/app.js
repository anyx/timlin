define(['backbone', 'marionette', 'application/Application'], function(Backbone, Marionette, Application) {

    var app = new Application();

    app.on('start', function(options) {
        app.addRegions({
            layout: options.container
        });
    });

    app.on("initialize:after", function(options){
    });


    return app;
});