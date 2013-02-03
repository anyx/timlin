define(['marionette', 'views/timeline', 'text!templates/layout.phtml'], function(Marionette, TimelineView, template) {
    return Marionette.Layout.extend({

        template: function() {
            return _.template(template, this);
        },
        
        regions: {
            timeline    : '.j-timeline'
        },
        
        onRender: function() {
            var view = new TimelineView({model: this.options.timeline});
            this.timeline.show(view);
        }
   });
});


