define(['marionette', 'tpl!templates/VersionChooser.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        
        serializeData: function() {
            return {
                document : this.model
            };
        }
    });
})