define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        
        document: null,
        
        initialize: function(options) {
            this.setDocument(options.document);
            if (this.id) {
                this.set('version_id', this.id);
            }
            this.unset('document');
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
        
        getParent: function() {
            if (!this.get('parent_id')) {
                throw new Error('Version don\'t have parent');
            }
            return this.getDocument().getVersion(this.get('parent_id'));
        },
        
        setDocument: function(document) {
            this.document = document;
        },
        
        getDocument: function() {
            return this.document;
        },
        
        isCurrentDocumentVersion: function() {
            return this.getDocument().getCurrentVersion().id == this.id;
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

