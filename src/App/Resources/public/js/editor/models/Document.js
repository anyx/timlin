define(['backbone', 'models/DocumentVersion'], function(Backbone, DocumentVersion) {
    return Backbone.Model.extend({

        versions : null,

        getVersions: function() {
            if (_.isNull(this.versions)) {
                this.versions = _.map(this.get('versions'), function(versionData) {
                    return this.createVersion(versionData);
                }, this);
            }
            return this.versions;
        },

        getTitle: function() {
            return this.get('title');
        },

        getDescription: function() {
            return this.get('description');
        },

        getVersion: function(versionId) {
            var version = _.find(this.getVersions(), function(version) {
                return version.id == versionId;
            }, this);
            
            if (!version) {
                throw new Error('Version with id '+versionId+' not found');
            }
            return version;
        },

        getCurrentVersion: function() {
            return this.getVersion(this.get('current_version_id'));
        },

        createVersion: function(versionData) {
            versionData.document = this;
            
            return new DocumentVersion(versionData);
        },
        
        createChildVersion: function(parentVersion) {
            return this.createVersion({
                'parent_version_id': parentVersion.id
            });
        },

        getCurrentVersionId: function() {
            return this.get('current_version_id');
        }
    });
});