define(['app', './Controller', './Layout'], function(app, Controller, Layout) {

    return app.module('timeline', function() {
        
        this.controllers  = [
            new Controller({
                    Layout  : Layout
            })
        ]
    });
});