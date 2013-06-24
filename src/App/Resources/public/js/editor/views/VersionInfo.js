define(['marionette', 'tpl!templates/VersionInfo.tpl'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        
        events : {
            'keyup .j-version-title': 'onKeyUpSetVersionTitle',
            'click .j-parent-version-link': 'onClickShowParentVersions',
            'change .j-version-published': 'onChangeVersionPublicity'
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
        },
        
        onChangeVersionPublicity: function(event) {
            this.model.set('published', $(event.currentTarget).is(':checked'));
            this.trigger('version:change', this.model);
        }
    });
})