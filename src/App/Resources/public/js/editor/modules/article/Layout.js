define(
    [
        'marionette',
        'app',
        'tpl!./templates/Layout.phtml',
        'views/DocumentPanel',
        'views/DocumentPanelSwitcher'
    ],
    function(
        Marionette,
        app,
        template,
        DocumentPanelView,
        DocumentPanelSwitcherView
    ) {

    return Marionette.Layout.extend({
        
        template        : template,
        
        className       : 'b-article-layout',
        
        regions         : {
            documentPanel   : app.options['document-panel'],
            documentPanelSwitcher: app.options['document-panel-switcher']
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
            var _this = this;
            this.initDimensions();
            
            var panelSwitcher = new DocumentPanelSwitcherView();
            var documentPanel = new DocumentPanelView({
                model : this.getArticle()
            });
            this.documentPanel.show(documentPanel);
            
            this.documentPanelSwitcher.show(panelSwitcher)
            panelSwitcher.on('toggle-document-panel', function() {
                documentPanel.$el.parent().toggle(0, function() {
                    _this.setEditorWidth();
                });
            });
        },

        initDimensions: function() {
            /* Calc layout width */
            
            this.getContentFrame().load(this.setEditorWidth);
            $(window).resize(this.setEditorWidth);
        },
        
        setEditorWidth : function () {
                var articleContentElement = $(app.options['article-content']);
                if (articleContentElement.length == 0) {
                    return;
                }
                
                articleContentElement
                    .css('width', articleContentElement.parent().width() - articleContentElement.position().left -1 + 'px');
        },


        getContentFrame : function() {
            return this.$el.find('.j-article-content');
        }
   });
});
