define(['marion'], function(Marion) {

    return Marion.Controller.extend({
        
        routes : {
            'index' : {
                'pattern'   : '',
                'action'    : 'indexAction'
            }
        },
        
        indexAction : function() {
            var layout = new this.options.Layout({
                application : this.getApplication()
            });
            
            this.showLayout(layout);
        }
    });
});

