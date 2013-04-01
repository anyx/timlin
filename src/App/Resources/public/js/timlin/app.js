define(['backbone', 'marionette', 'application/Application'], function(Backbone, Marionette, Application) {

    var app = new Application();

    app.on("initialize:after", function(options){
    });

    return app;
});