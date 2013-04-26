define(['marion/Controller'], function(Controller) {

    return Controller.extend({
        
        routes : {
            'article-edit'  : {
                'pattern'   : 'editor/article/:id',
                'action'    : 'editAction'
            },
            'article-preview'  : {
                'pattern'   : 'preview/article/:id',
                'action'    : 'previewAction'
            }
        },
        
        layout : null,
        
        initialize: function(options) {
            this.layout = new options.Layout;
        },
        
        editAction : function(id) {
            
            this.setLayout(this.layout);
            
            var content = '<div><h3>Content</h3></div>';
            var contentFrame = this.layout.getContentFrame();
            contentFrame.attr('src', this.getPreviewUrl());
            
            /*
            contentFrame.attr('src', 'data:text/html;charset=utf-8,' + content);
            var src = 'http://timlin.local/bundles/app/js/vendors/mercury/javascripts/mercury_loader.js';
            var script = '<script type="text/javascript" src="'+src+'"></script>';
            
            //contentFrame.contents().find('head').append(script);
            console.log(contentFrame.find('head'));
            */
        },
        
        previewAction: function(id) {
            /*
            var articleCollection = this.getApplication().getEntityManager().getCollection('Article'); 
            var article = articleCollection.recieve(id);
            console.log('pe', articleCollection);
            */
        },
        
        getPreviewUrl: function(id) {
            /*
            var previewRoute = this.getApplication().getRouter().generate('article-preview', {id:id});
            return window.location.origin + window.location.pathname + previewRoute;
            */
           return 'http://timlin.local/app_dev.php/preview/article/517ae2e1d0621eca30000000';
        }
    });
});

