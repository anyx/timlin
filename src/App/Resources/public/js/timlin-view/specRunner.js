require.config({
    paths: {
        'jquery.ui'     : '/bundles/app/js/vendors/jquery-ui/js/jquery-ui-1.10.1.custom.min',
        'underscore'    : '/bundles/app/js/vendors/underscore',
        'backbone'      : '/bundles/app/js/vendors/backbone',
        'marionette'    : '/bundles/app/js/vendors/backbone.marionette/lib/backbone.marionette',
        'moment'        : '/bundles/app/js/vendors/moment',
        'anyx'          : '/bundles/app/js/vendors/anyx',
        'text'          : '/bundles/app/js/vendors/require.js/text',
        'tpl'           : '/bundles/app/js/vendors/require.js/tpl',
        'jasmine'       : '/bundles/app/js/vendors/jasmine/jasmine',
        'jasmine-html'  : '/bundles/app/js/vendors/jasmine/jasmine-html',
        'spec'          : '/bundles/app/js/timlin-view/specs'
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
        'moment/lang/ru': {
            exports: 'moment',
            deps: ['moment/moment']
        },
        'jasmine': {
          exports: 'jasmine'
        },
        'jasmine-html': {
          deps: ['jasmine'],
          exports: 'jasmine'
        }
    },
    deps: [
        'jquery.ui',
        'underscore',
        'backbone',
        'marionette',
        'moment/lang/ru'
    ],
    packages: ['timlin']
});

require(['underscore', 'jasmine-html'], function(_, jasmine){

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/models/timelineScale');


    $(function(){
      require(specs, function(){
        jasmineEnv.execute();
      });
    });
});