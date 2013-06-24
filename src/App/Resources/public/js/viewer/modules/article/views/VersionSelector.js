define(['marionette', 'tpl!./../templates/VersionSelector.tpl'], function(Marionette, template) {
    return Marionette.ItemView.extend({

        template: template,
        
        serializeData: function() {
            return {
                document: this.model
            }
        }
    });
});