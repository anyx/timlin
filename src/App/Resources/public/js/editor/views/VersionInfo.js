define(['marionette', 'tpl!templates/VersionInfo.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        
        events : {
            'keyup .j-version-title': 'onKeyUpSetVersionTitle',
            'click .j-parent-version-link': 'onClickShowParentVersions'
        },
        
        serializeData: function() {
            return {
                version : this.model 
            }
        },
        
        onKeyUpSetVersionTitle: function(event) {
            this.model.set('title', $(event.currentTarget).val());
            this.trigger('version:change', this.model);
        },
        
        onClickShowParentVersions: function(event) {
            this.trigger('version:select', $(event.currentTarget).data('parent-id'));
            return false;
        }
    });
})