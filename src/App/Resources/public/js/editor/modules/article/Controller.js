define(['marion/Controller'], function(Controller) {

    return Controller.extend({
        
        routes : {
            'article-edit'  : {
                'pattern'   : 'editor/article/:id',
                'action'    : 'editAction'
            }
        },
        
        layout : null,
        
        initialize: function(options) {
            this.layout = new options.Layout;
        },
        
        editAction : function(id) {
            
            console.log(this);
            
            this.setLayout(this.layout);
            
            var content = '<div><h3>Content</h3></div>';
            
            var contentFrame = this.layout.getContentFrame();
            contentFrame.attr('src', 'data:text/html;charset=utf-8,' + content);
            var src = 'http://timlin.local/bundles/app/js/vendors/mercury/javascripts/mercury_loader.js';
            var script = '<script type="text/javascript" src="'+src+'"></script>';
            
            //contentFrame.contents().find('head').append(script);
            console.log(contentFrame.find('head'));
            /*
            */
        }
    });
});

