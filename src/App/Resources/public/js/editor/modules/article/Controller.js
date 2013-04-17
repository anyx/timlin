define(['marion/Controller'], function(Controller) {

    return Controller.extend({
        
        routes : {
            'article-edit'  : {
                'pattern'   : 'editor/article/:id',
                'action'    : 'editAction'
            }
        },
        
        editAction : function(id) {
            console.log('Article');
        }
    });
});

