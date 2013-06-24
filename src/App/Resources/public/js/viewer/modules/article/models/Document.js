define(['./../../../../models/Document', './DocumentVersion'], function(BaseDocument, BaseDocumentVersion) {
    return BaseDocument.extend({
        
        createVersion: function(versionData) {
            versionData.document = this;
            return new BaseDocumentVersion(versionData);
        }
    });
});