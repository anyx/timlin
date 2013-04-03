define(['./Widget', '../../models/Point'], function(Widget, Point) {
    
    return Widget.extend({
        
        events  : {
            'click' : 'onClick'
        },

        getName :   function() {
            return 'point';
        },
        
        getTitle: function() {
            return 'Point';
        },
        
        onClick : function() {
            var timelineView = this.getLayout().timeline.currentView;
            var point = new Point({
                date : timelineView.getCenterDate()
            });
            
            timelineView.addPoint(point);
        }
    });
});
    