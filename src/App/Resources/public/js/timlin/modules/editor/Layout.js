define(
    [
        'marionette',
        './models/DateScale',
        './views/Timeline',
        './views/ScaleSlider',
        './views/TopBar',
        './views/WidgetPanel',
        'tpl!./templates/Layout.phtml'
    ],
    function(
        Marionette,
        DateScale,
        TimelineView,
        ScaleSliderView,
        TopBarView,
        WidgetPanelView,
        template
    ) {

    return Marionette.Layout.extend({

        template        : template,

        className       : 'b-layout',

        mouseDown       : false,
        startDragEvent  : null,
        lastDragEvent   : null,

        events          : {
            'mousedown'     : 'onMouseDown',
            'mousemove'     : 'onMouseMove',
            'mouseup'       : 'onMouseUp',
            'mouseleave'    : 'onMouseLeave'
        },

        regions: {
            timeline    : '.j-timeline',
            scaleSlider : '.j-scale-slider',
            topBar      : '.j-top-bar',
            widgetPanel : '.j-widget-panel'
        },

        onShow: function() {
            
            var dateScale = new DateScale();
            
            var timelineView = new TimelineView({
                model       : this.options.timeline,
                dateScale   : dateScale,
                layout      : this
            });
            this.timeline.show(timelineView);
            
            this.scaleSlider.show(new ScaleSliderView({
                model: dateScale
            }));
            
            this.topBar.show(new TopBarView({
                layout  : this
            }));
            this.widgetPanel.show(new WidgetPanelView());
        },
        
        getApp  : function() {
            return this.options.app;
        },
        
        /**
         * DOM events
         */
        
        onMouseDown: function(event) {
            if (event.which === 1) {
                this.mouseDown = true;
                this.startDragEvent = event;
            }
        },
        
        onMouseUp: function(event) {
            if (event.which === 1) {
                this.mouseDown = false;
            }
        },
        
        onMouseMove: function(event) {
            if (this.mouseDown) {
                this.trigger('swipe', {
                    startEvent  : this.startDragEvent,
                    moveEvent   : event,
                    offsetX     : event.offsetX - this.lastDragEvent.offsetX,
                    offsetY     : event.offsetY - this.lastDragEvent.offsetY
                });
            }
            this.lastDragEvent = event;
        },
        
        onMouseLeave: function() {
            this.mouseDown = false;
        }
   });
});
