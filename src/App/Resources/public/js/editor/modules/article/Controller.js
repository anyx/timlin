define(['marion', 'module'], function(Marion, module) {

    return Marion.Controller.extend({
        
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
            var layout = this.layout;
            var _this = this;
            
            var modelLoading = this.getApplication().getEntityManager().fetch('Article', id);
            this.getApplication().loader('Loading article', modelLoading);
            
            modelLoading.done(function(data, status, deferred, article) {
                layout.setArticle(article);
                _this.showLayout(layout);
            });
        }
    });
});
