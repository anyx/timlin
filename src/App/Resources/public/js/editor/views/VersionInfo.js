define(['marionette', 'tpl!templates/VersionInfo.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        
        events : {
            'keyup .j-version-title': "onKeyUpSetVersionTitle"
        },
        
        serializeData: function() {
            return {
                version : this.model 
            }
        },
        
        onKeyUpSetVersionTitle: function(event) {
            this.model.set('title', $(event.currentTarget).val());
            this.trigger('version:change', this.model);
        }
    });
})