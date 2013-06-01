define(['marionette', 'tpl!templates/VersionInfo.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        
        serializeData: function() {
            return {
                version : this.model 
            }
        }
    });
})