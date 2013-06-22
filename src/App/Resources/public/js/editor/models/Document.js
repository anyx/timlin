define(['../../models/Document', 'models/DocumentVersion'], function(BaseDocument, DocumentVersion) {
    return BaseDocument.extend({
        
        createVersion: function(versionData) {
            versionData.document = this;
            
            return new DocumentVersion(versionData);
        },
        
        createChildVersion: function(parentVersion) {
            return this.createVersion({
                'parent_version_id': parentVersion.id
            });
        },

        clearVersions: function() {
            this.versions = null;
            return this;
        },
        
        setPublished: function(publicity) {
            this.set('published', Boolean(publicity));
        },
        
        requestChangeVersion: function(versionId) {
            var document = this;

            var version = document.getVersion(versionId);

            return $.ajax(
                version.getChangeVersionUrl(),
                {
                    type: 'PUT',
                    dataType: 'json',
                    data: {
                        'new_current_version': versionId
                    },
                    success: function(data) {
                        document
                        .clearVersions()
                        .set(data);
                    }
                }
            );
        },

        toJSON: function() {
            var attrs = _.clone(this.attributes);
            delete attrs['versions'];
            return attrs;
        }
    });
});