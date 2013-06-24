define(['marion', 'module'], function(Marion, module) {

    return Marion.Controller.extend({
        
        routes : {
            'index'  : {
                'pattern'   : '',
                'action'    : 'viewAction'
            },
            'article-view'  : {
                'pattern'   : 'document/:id',
                'action'    : 'viewAction'
            },
           'article-view-version'  : {
                'pattern'   : 'document/:id/:version',
                'action'    : 'viewAction'
            }
        },
        
        layout : null,
        
        initialize: function(options) {
            this.layout = new options.Layout;
        },
        
        viewAction : function(documentId, versionId) {
            if (_.isUndefined(documentId)) {
                this.getApplication().showError('Document not found');
            }
            
            var layout = this.layout;
            var _this = this;
            
            var modelLoading = this.getApplication().getEntityManager().fetch('Article', documentId);
            this.getApplication().loader('Loading article', modelLoading);
            
            modelLoading.done(function(data, status, deferred, article) {
                layout.setArticle(article, versionId);
                _this.showLayout(layout);
            });
        }
    });
});
