define(['./Application', 'module'], function(Application, module) {

    var app = new Application({options : module.config()});

    app.on('start', function(options) {
        app.addRegions({
            layout: this.options.selectors.container
        });
    });
    
    /* Calc layout height */
    var setEditorHeight = function () {
        $(app.options.selectors.container)
            .css('height', $(window).height() - $(app.options.selectors['top-panel']).height() + 'px');
    };
    
    setEditorHeight();
    $(window).resize(setEditorHeight);
    return app;
});