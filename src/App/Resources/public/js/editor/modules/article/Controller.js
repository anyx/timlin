define(['marion/Controller', 'views/DocumentPanel', 'module'], function(Controller, DocumentPanelView, module) {

    return Controller.extend({
        
        previewUrl: module.config().previewUrl,
        
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
            this.setLayout(this.layout);
            
            var contentIframe = this.layout.getContentFrame();
            contentIframe.attr('src', this.getPreviewUrl(id));
            
            var iframeLoading = new $.Deferred();
            contentIframe    
                .load(function() {
                    iframeLoading.resolve();
                })
            ;
            
            var layout = this.layout;
            var modelLoading = this.getApplication().getEntityManager().fetch('Article', id);
            modelLoading.done(function(data, status, deferred, article) {
                $.when(modelLoading, iframeLoading).done(function() {
                    layout.documentPanel.show(new DocumentPanelView({
                       model : article
                    }));
                });
            });
        },
                
        getPreviewUrl: function(id) {
           return this.previewUrl.split(':id').join(id);
        }
    });
});
