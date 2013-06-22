define(['../../models/DocumentVersion', 'module'], function(BaseDocumentVersion, module) {
    return BaseDocumentVersion.extend({

        _url: module.config().url,
        
        url: function() {
            return this._url.split(':document').join(this.getDocumentId())
        },
        
        getChangeVersionUrl: function() {
            return this.url() + '/change';
        }
    })
});

