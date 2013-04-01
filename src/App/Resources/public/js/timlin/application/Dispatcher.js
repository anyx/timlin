define(['backbone'], function(Backbone) {

    return Backbone.Model.extend({
        
        routes : {},
        
        getRoutes: function() {
            return this.routes;
        },
        
        addController: function(module, controller) {
            _.each(controller.routes, function(action, route) {
                var methodName = module + '_' + route;
                this.routes[route] = methodName;
                this[methodName] = function() {
                    return controller[action].apply(controller, arguments);
                } 
            }, this);
        }
    });
});

