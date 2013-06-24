define(['./Application', 'module'], function(Application, module) {

    var app = new Application({options : module.config()});

    app.on('start', function(options) {
        app.addRegions({
            layout: this.options.selectors.container
        });
    });
    
    return app;
});