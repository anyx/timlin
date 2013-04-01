define(['marionette', './Dispatcher'], function(Marionette, Dispatcher) {

    return Marionette.Application.extend({

        dispatcher: new Dispatcher,

        getDispatcher: function() {
            return this.dispatcher;
        },
        
        addController: function(module, controller) {
            this.dispatcher.addController(module, controller);
        },
        
        /**
         * 
         */
        onStart     : function() {
            var Router = Marionette.AppRouter.extend({
                appRoutes   : this.getDispatcher().getRoutes(),
                controller  : this.getDispatcher()
            });
            
            this.router = new Router();

            if (Backbone.history) {
                Backbone.history.start();
            }
        }
    });
})


