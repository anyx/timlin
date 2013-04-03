define(['marionette', './Router'], function(Marionette, Router) {

    return Marionette.Application.extend({

        router: new Router,

        getDispatcher: function() {
            return this.dispatcher;
        },
        
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
            
            this.getRouter().buildRoutes();
            
            if (Backbone.history) {
                Backbone.history.start();
            }
        },
        
        generate    : function(route, params) {
            console.log(this.router);
        }
    });
})


