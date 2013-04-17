define(['app', './Controller'], function(app, Controller) {

    return app.module('article', function() {
        
        this.controllers  = [
            new Controller()
        ]
    });
});