define(['app', 'module', './Controller', './Layout'], function(app, module, Controller, Layout) {

    return app.module('article', function() {
        
        this.module = module,
        
        this.controllers  = [
            new Controller({
                Layout  : Layout
            })
        ]
    });
});