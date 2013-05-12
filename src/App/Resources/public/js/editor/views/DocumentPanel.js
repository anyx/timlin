define(['marionette', 'tpl!templates/DocumentPanel.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        
        initialize: function() {
        }
    });
})