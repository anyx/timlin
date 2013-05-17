require.config({
    paths: {
        'jquery'        : '/bundles/app/js/vendors/jquery',
        'jquery.ui'     : '/bundles/app/js/vendors/jquery-ui/js/jquery-ui-1.10.1.custom.min',
        'underscore'    : '/bundles/app/js/vendors/underscore',
        'backbone'      : '/bundles/app/js/vendors/backbone',
        'marionette'    : '/bundles/app/js/vendors/backbone.marionette/lib/backbone.marionette',
        'moment'        : '/bundles/app/js/vendors/moment',
        'marion'        : '/bundles/app/js/vendors/marion',
        'mercury'       : '/bundles/app/js/vendors/mercury/javascripts/mercury_loader.js?pack=development',
        'text'          : '/bundles/app/js/vendors/require.js/text',
        'tpl'           : '/bundles/app/js/vendors/require.js/tpl'
    },
    shim: {
        'mercury': ['jquery'],
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
        'moment/lang/ru': {
            exports: 'moment',
            deps: ['moment/moment']
        }
    },
    deps: [
        'jquery.ui',
        'underscore',
        'backbone',
        'marionette',
        'moment/lang/ru'
    ],
    packages: ['mercury']
});

require(['mercury'], function(mercury) {

})