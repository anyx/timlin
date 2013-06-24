define(
    [
        'marionette',
        'module',
        'tpl!./templates/Layout.tpl',
        './views/DocumentView',
        './views/ReviewPanel',
        './views/VersionSelector'
    ],
    function(
        Marionette,
        module,
        template,
        DocumentView,
        ReviewPanelView,
        VersionSelectorView
    ) {

    return Marionette.Layout.extend({
        
        template        : template,
        
        className       : 'b-article-layout',

        regions         : {
            versionSelector : '.j-version-selector',
            documentContent : '.j-document-content',
            reviewPanel     : '.j-review-panel'
        },
        
        article         : null,
        
        versionId: null,
        
        setArticle      : function(article, versionId) {
            this.article = article;
            this.setVersionId(versionId);
        },

        setVersionId: function(versionId) {
            this.versionId = versionId;
        },
        
        getVersionId: function() {
            if (_.isNull(this.versionId) || _.isUndefined(this.versionId)) {
                return this.getArticle().getVersions()[0].id;
            }
            
            return this.versionId;
        },

        getArticle      : function() {
            return this.article;
        },
        
        onShow: function() {
            
            this.versionSelector.show(new VersionSelectorView({
                model:      this.getArticle(),
                versionId:  this.getVersionId()
            }));
            
            this.documentContent.show(new DocumentView({
                model:      this.getArticle(),
                versionId:  this.getVersionId()
            }));

            this.reviewPanel.show(new ReviewPanelView({
                model:      this.getArticle(),
                versionId:  this.getVersionId()
            }));
        }
   });
});
