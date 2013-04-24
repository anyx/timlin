define(['marionette', './Router', './EntityManager'], function(Marionette, Router) {

    return Marionette.Application.extend({

        router: new Router,

        getRouter: function() {
            return this.router;
        },
        
        addController: function(module, controller) {
            controller.setApplication(this);
            this.getRouter().addController(module, controller);
        },
        
        /**
         * 
         */
        onStart     : function() {
            this.startRouter();
        },
        
        startRouter : function() {
            _.each(this.submodules, function(submodule) {
                if ('controllers' in submodule) {
                    _.each(submodule.controllers, function(controller) {
                        this.addController(submodule.moduleName, controller);
                    }, this);
                }
            }, this);
            
            this.getRouter().buildRoutes();
            
            if (Backbone.history) {
                Backbone.history.start();
            }
        }
    });
})


