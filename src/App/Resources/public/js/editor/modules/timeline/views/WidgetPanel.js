define(['marionette', 'tpl!../templates/WidgetPanel.tpl'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template        : template
    });
});
    