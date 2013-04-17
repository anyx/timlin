define(['marionette', 'tpl!../templates/WidgetPanel.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template        : template
    });
});
    