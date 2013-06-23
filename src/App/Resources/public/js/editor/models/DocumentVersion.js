define(['backbone', '../../models/DocumentVersion', 'module'], function(Backbone, BaseDocumentVersion, module) {
    return BaseDocumentVersion.extend({

        _url: module.config().url,
        
        url: function() {

            var versionReplacer = _.isUndefined(this.id) ? '' : this.id;
            var url = this._url
                .split(':document').join(this.getDocumentId())
                .split(':version').join(versionReplacer)
            ;
            
            if (url.lastIndexOf('/') == url.length - 1) {
                url = url.substr(0, url.length - 1);
            }

            return url;
        },
        
        getChangeVersionUrl: function() {
            return this.url() + '/change';
        },
        
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            options = _.extend(options, {
                headers: {
                    http_version_id: this.id
                }
            });

            return Backbone.Model.prototype.destroy.call(this, options);
        }
    })
});

