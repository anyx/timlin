define(['app', 'module', './Controller', './Layout'], function(app, module, Controller, Layout) {

    app.addController(
        'index',
        new Controller({
            Layout  : Layout
        })
    );
    
    var index = app.module('index', function() {
        
    });
    
    return index;
});