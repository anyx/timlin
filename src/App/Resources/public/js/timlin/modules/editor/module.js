define(['app', './Controller', './Layout'], function(app, Controller, Layout) {

    app.addController(
        'editor',
        new Controller({
            Layout  : Layout
        })
    );
    
    var editor = app.module('editor', function() {
    });
    
    return editor;
});