define(
    [
        'marionette',
        'module',
        'tpl!./templates/Layout.phtml',
        'views/DocumentPanel',
        'views/DocumentPanelSwitcher',
        './views/Workspace'
    ],
    function(
        Marionette,
        module,
        template,
        DocumentPanelView,
        DocumentPanelSwitcherView,
        WorkspaceView
    ) {

    return Marionette.Layout.extend({
        
        template        : template,
        
        className       : 'b-article-layout',

        regions         : {
            documentPanel   : module.config()['document-panel'],
            documentPanelSwitcher: module.config()['document-panel-switcher'],
            workspace       : module.config()['workspace']
        },
        
        article         : null,
        
        setArticle      : function(article) {
            this.article = article;
        },

        getArticle      : function() {
            return this.article;
        },
        
        initialize: function() {
        },
        
        onShow: function() {

            var panelSwitcher = new DocumentPanelSwitcherView();
            var documentPanel = new DocumentPanelView({
                model : this.getArticle()
            });
            var workspace = new WorkspaceView({
                model: this.getArticle()
            });
            
            this.documentPanel.show(documentPanel);
            
            this.documentPanelSwitcher.show(panelSwitcher);
            panelSwitcher.on('toggle-document-panel', function() {
                documentPanel.$el.parent().toggle(0, function(){
                    workspace.$el.parent().toggleClass('b-editor__workspace__width-full');
                });
            });
            
            this.workspace.show(workspace);
        },

        initDimensions: function() {
            /* Calc layout width */
        },
        
        setEditorWidth : function () {
            /*
            var articleContentElement = $(app.options['article-content']);
            if (articleContentElement.length == 0) {
                return;
            }

            articleContentElement
                .css('width', articleContentElement.parent().width() - articleContentElement.position().left -1 + 'px');
            */
        },


        getContentFrame : function() {
            return this.$el.find('.j-article-content');
        }
   });
});
