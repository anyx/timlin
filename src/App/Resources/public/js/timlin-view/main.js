require.config({
    paths: {
        'underscore'    : '/bundles/app/js/vendors/underscore',
        'backbone'      : '/bundles/app/js/vendors/backbone',
        'marionette'    : '/bundles/app/js/vendors/backbone.marionette/lib/backbone.marionette',
        'moment'        : '/bundles/app/js/vendors/moment',
        'anyx'          : '/bundles/app/js/vendors/anyx',
        'text'          : '/bundles/app/js/vendors/require.js/text'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        marionette : {
            exports : 'Backbone.Marionette',
            deps : ['backbone']
        },
        'moment/lang/ru': ['moment/moment']
    },
    deps: [
        'underscore',
        'backbone',
        'marionette',
        'moment/lang/ru'
    ],
    packages: ['timlin']
});

require(['app'], function(app) {
    //var app = new App(appConfig);
    return app.start(appConfig);
})