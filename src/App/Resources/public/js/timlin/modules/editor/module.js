define(['app', './Controller'], function(app, Controller) {

    app.addController('editor', new Controller());
    
    var editor = app.module('editor', function() {
    });
    
    return editor;
});