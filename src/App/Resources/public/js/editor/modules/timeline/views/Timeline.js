define(['marionette', '../models/GradationChooser', '../models/Timeline', 'tpl!../templates/Timeline.phtml'], function(Marionette, GradationChooser, Timeline, template) {
    
    return Marionette.ItemView.extend({

        template        : template,
        
        durationInPixel : 1,

        gradationChooser: new GradationChooser(),

        startDate       : new moment(),

        scale           : null, 

        /**
         *
         */
        initialize : function(options) {
            this.setScale(options.dateScale);
            this.listenTo(options.dateScale, 'change', this.onChangeScale);
            this.listenTo(options.layout, 'swipe', this.onSwipe)
        },
        
        getGradationChooser: function() {
            return this.gradationChooser;
        },
        
        /**
         * 
         */
        renderDates: function() {
            var segmentDuration = this.getGradationChooser().calcSegmentDuration(this.scale);

            this.durationInPixel = this.scale.value / this.scale.segmentWidth;

            this.$el.find('.j-axis').empty();

            var maxDate = this.getMaxDate();

            var nextPoint = this.calcStartSegmentDate(segmentDuration);
            var duration = moment.duration(segmentDuration.value, segmentDuration.scaleCode);

            while (maxDate.diff(nextPoint) > 0) {
                this.renderDateOnAxis(nextPoint);
                nextPoint.add(duration);
            }
        },

        /**
         * 
         */
        renderDateOnAxis: function(date) {
            var dateHint = $('<span class="b-date-hint"><span class="b-date-hint-value">'+ date.format('YYYY-MM-DDTHH:mm:ss Z') +'</span></span>');
            dateHint.css({
                left: this.calcDatePosition(date) + 'px'
            });

            dateHint.appendTo(this.$el.find('.j-axis'));
        },

        calcStartSegmentDate: function(segmentDuration) {
            var date = this.startDate.clone();
            var nullDate = new moment([0,0,0]);
            var diff = date.add(moment.duration(segmentDuration.value, segmentDuration.scaleCode)).diff(nullDate, segmentDuration.scaleCode);
            
            nullDate.add(segmentDuration.scaleCode, diff - diff % segmentDuration.value);
            
            return nullDate;
        },

        /**
         * 
         */
        calcDatePosition: function(date) {
            return Math.round(date.diff(this.startDate, this.scale.getScaleCode()) / this.durationInPixel);
        },

        getMinDate: function() {
            return this.startDate.clone();
        },

        getMaxDate: function() {
            return this.startDate.clone().add(this.scale.getScaleCode(), this.$el.width() * this.durationInPixel);
        },

        getCenterDate: function() {
            return this.startDate.clone().add(this.scale.getScaleCode(), (this.$el.width() / 2) * this.durationInPixel);
        },

        setScale: function(scale) {
            this.scale = scale;
        },

        addPoint: function(point) {
            this.model.addPoint(point);
        },

        /**
         * Events
         */

        onShow: function() {
            this.renderDates();
        },

        onSwipe: function(event) {
            this.startDate.subtract(this.scale.getScaleCode(), this.durationInPixel * event.offsetX);
            this.renderDates();
        },

        onChangeScale: function(scale) {
            this.setScale(scale);
            this.renderDates();
        }
    });
})