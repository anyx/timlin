define(['marionette', 'models/timeline', 'text!templates/timeline.phtml'], function(Marionette, Timeline, template) {
    
    return Marionette.ItemView.extend({
        template: function() {
            return _.template(template, this.model);
        }
    });
})