define(['application/Controller'], function(Controller) {

    return Controller.extend({
        
        routes : {
            'timed-editor'  : {
                'pattern'   : 'editor/:id',
                'action'    : 'editorAction'
            }
        },
        
        editorAction : function(id) {
            this.setLayout(new this.options.Layout);
        }
    });
});

