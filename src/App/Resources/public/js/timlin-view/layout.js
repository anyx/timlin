define(
    ['marionette', 'models/dateScale', 'views/timeline', 'views/scaleSlider', 'text!templates/layout.phtml'],
    function(Marionette, DateScale, TimelineView, scaleSliderView, template) {
    return Marionette.Layout.extend({

        template: function() {
            return _.template(template, this);
        },
        
        regions: {
            timeline    : '.j-timeline',
            scaleSlider : '.j-scale-slider'
        },
        
        onShow: function() {
            var dateScale = new DateScale();
            
            var timelineView = new TimelineView({
                model       : this.options.timeline,
                dateScale   : dateScale
            });
            this.timeline.show(timelineView);
            
            var sliderView = new scaleSliderView({
                model: dateScale
            });
            this.scaleSlider.show(sliderView);
        }
   });
});


