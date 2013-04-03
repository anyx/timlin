define(['app', './Controller', './Layout'], function(app, Controller, Layout) {

    app.addController(
        'index',
        new Controller({
            Layout  : Layout
        })
    );
    
    var index = app.module('index', function() {});
    
    return index;
});