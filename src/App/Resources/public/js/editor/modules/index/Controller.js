define(['marion/Controller'], function(Controller) {

    return Controller.extend({
        
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
            
            this.setLayout(layout);
        }
    });
});

