define(['backbone', 'module'], function(Backbone, module) {
    return Backbone.Model.extend({
        
        _url: module.config().url,
        
        document: null,
        
        url: function() {
            return this._url.split(':document').join(this.getDocumentId())
        },
        
        initialize: function(options) {
            this.setDocument(options.document);
            delete options.document;
        },
        
        getId: function() {
            return this.get('id')
        },
        
        getTitle: function() {
            var title = this.get('title');
            if (!title) {
                title = this.get('id');
            }
            return title;
        },
        
        isPublished: function() {
            return this.get('published');
        },
        
        hasParent: function() {
            return this.get('parent_id');
        },
        
        setDocument: function(document) {
            this.document = document;
        },
        
        getDocument: function() {
            return this.document;
        },
        
        getDocumentId: function() {
            if (!this.getDocument()) {
                throw new Error('Version is not belongs to document');
            }
            
            return this.getDocument().id;
        },
        
        getCreatedAt: function() {
            return new moment(this.get('created_at'));
        },

        getPublishedAt: function() {
            if (!this.isPublished()) {
                return false;
            }
            return new moment(this.get('published_at'));
        }
    })
});

