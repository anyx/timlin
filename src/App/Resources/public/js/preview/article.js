require.config({
    paths: {
        'jquery'        : '/bundles/app/js/vendors/jquery/jquery.min',
        'jquery.ui'     : '/bundles/app/js/vendors/jquery-ui/ui/minified/jquery-ui.min',
        'underscore'    : '/bundles/app/js/vendors/underscore/underscore',
        'backbone'      : '/bundles/app/js/vendors/backbone/backbone-min',
        'bootstrap'     : '/bundles/app/js/vendors/bootstrap/docs/assets/js/bootstrap.min',
        'marionette'    : '/bundles/app/js/vendors/marionette/lib/backbone.marionette',
        'moment'        : '/bundles/app/js/vendors/moment/min',
        'marion'        : '/bundles/app/js/vendors/marion/build/marion',
        'tpl'           : '/bundles/app/js/vendors/requirejs-tpl/tpl',
        //
        'mercury'               : '/bundles/app/js/vendors/mercury/distro/mercury',
        'mercury.loader'        : '/bundles/app/js/mercury/loader',
        'mercury.options'       : '/bundles/app/js/mercury/options/loader',
        'mercury.regions.path'  : '/bundles/app/js/vendors/mercury/distro/regions',
        'mercury.deps'          : '/bundles/app/js/vendors/mercury/distro/dependencies'
    },
    shim: {
        'mercury': {
            deps: ['jquery', 'mercury.loader/rangy', 'mercury.deps/marked-0.2.8'],
            exports: 'Mercury'
        },
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
            deps: ['moment/moment.min']
        },
        //Mercury deps
        'mercury.loader/rangy': ['mercury.deps/rangy-core'],
        'mercury.loader/main': ['mercury.loader/rangy']
    },
    deps: [
        'jquery.ui',
        'underscore',
        'backbone',
        'marionette',
        'moment/lang/ru'
    ]
});
require(['underscore', 'mercury', 'mercury.options'], function(_, Mercury, options) {
    _.extend(Mercury.configuration, options.configuration);
    require(['mercury.loader/main'], function(){
        /*
        var model = new Mercury.Model.Page();
        model.id = options.id;
        console.log(model, Mercury);
        */
        Mercury.init();
    });
    
})