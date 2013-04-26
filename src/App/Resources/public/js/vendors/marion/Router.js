define(['marionette'], function(Marionette) {

    return Marionette.AppRouter.extend({
        appRoutes: {},
        
        namedRoutes : {},
        
        controller  : {},
        
        splitter    : '#',
        
        /**
         * 
         */
        addController: function(module, controller) {
            _.each(controller.routes, function(route, name) {
                
                if (name in this.namedRoutes) {
                    throw new Error('Route name \''+ name + '\' already use');
                }
                this.namedRoutes[name] = route;
                
                var methodName = module + '_' + route.action;
                this.appRoutes[route.pattern] = methodName;
                this.controller[methodName] = function() {
                    return controller[route.action].apply(controller, arguments);
                } 
            }, this);
        },
        
        /**
         *
         */
        generate: function(name, parameters, withSplitter) {
            var withSplitter = withSplitter || true;
            
            if (!(name in this.namedRoutes)) {
                throw new Error('Route \''+ name + '\' not found');
            }
            
            var result = this.namedRoutes[name].pattern;
            _.each(parameters, function(value, param) {
                result = result.split(':'+param).join(value);
            });
            
            if (withSplitter) {
                result = this.splitter + result;
            }
            
            return result;
        },
        
        navigateToRoute: function(route, params, options) {
            return this.navigate(this.generate(route, params, false), options);
        },
        
        /**
         * 
         */
        buildRoutes: function() {
            return this.processAppRoutes(this.controller, this.appRoutes);
        }
    });
});

