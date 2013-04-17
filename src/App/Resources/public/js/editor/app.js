define(['marion/Application', 'module'], function(Application, module) {

    var app = new Application({options : module.config()});

    app.on('start', function(options) {
        app.addRegions({
            layout: this.options.container
        });
    });

    app.on("initialize:after", function(options){
    });

    return app;
});