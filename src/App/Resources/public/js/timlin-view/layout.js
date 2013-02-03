define(['marionette', 'views/timeline', 'text!templates/layout.phtml'], function(Marionette, TimelineView, template) {
    return Marionette.Layout.extend({

        template: function() {
            return _.template(template, this);
        },
        
        regions: {
            timeline    : '.j-timeline'
        },
        
        onShow: function() {
            this.timeline.show(new TimelineView({
                model: this.options.timeline
            }));
        }
   });
});


