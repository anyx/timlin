require.config({
    paths: {
        'jquery'        : '/bundles/app/js/vendors/jquery/jquery.min',
        'jquery.ui'     : '/bundles/app/js/vendors/jquery-ui/ui/minified/jquery-ui.min',
        'underscore'    : '/bundles/app/js/vendors/underscore/underscore',
        'backbone'      : '/bundles/app/js/vendors/backbone/backbone',
        'bootstrap'     : '/bundles/app/js/vendors/bootstrap/docs/assets/js/bootstrap.min',
        'marionette'    : '/bundles/app/js/vendors/marionette/lib/backbone.marionette',
        'moment'        : '/bundles/app/js/vendors/moment/min',
        'marion'        : '/bundles/app/js/vendors/marion/build/marion',
        'tpl'           : '/bundles/app/js/vendors/requirejs-tpl/tpl'
    },
    shim: {
        'bootstrap': ['jquery'],
        'jquery.ui': ['jquery'],
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'marionette' : {
            exports : 'Backbone.Marionette',
            deps : ['backbone']
        },
        'marion' : {
            exports : 'Marion',
            deps : ['marionette']
        },
        'moment/lang/ru': {
            exports: 'moment',
            deps: ['moment/moment.min']
        }
    },
    deps: [
        'bootstrap',
        'jquery.ui',
        'underscore',
        'backbone',
        'marionette',
        'moment/lang/ru'
    ],
    packages: ['timlin']
});

require(['app', 'modules'], function(app, modules) {
    return app.start();
})