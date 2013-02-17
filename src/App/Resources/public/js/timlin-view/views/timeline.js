define(['marionette', 'models/timeline', 'models/gradationChooser', 'tpl!templates/timeline.phtml'], function(Marionette, Timeline, GradationChooser, template) {
    
    return Marionette.ItemView.extend({

        events          : {
            mousedown   : 'onMouseDown',
            mousemove   : 'onMouseMove',
            mouseup     : 'onMouseUp'
        },

        mouseDown       : false,

        periodInPixel   : 1,
        
        segmentWidth    : 100,
        
        gradationChooser: new GradationChooser(),
        
        defaultCenter   : new moment(),
        
        centerDate      : new moment(),
        
        centerPosition  : 0,
        
        scale           : null, 
        
        template        : template,
        
        /**
         *
         */
        initialize : function(options) {
            this.setScale(options.dateScale.getScale());
            this.listenTo(options.dateScale, "change", this.onChangeScale);
        },
        
        /**
         * 
         */
        renderDates: function() {
            this.centerPosition = Math.round(this.$el.width() / 2);
            
            var gradation = this.gradationChooser.findGradation(this.scale);
            
            this.periodInPixel = this.scale.value / this.segmentWidth;
            
            this.$el.find('.j-axis').empty();

            var lineElement = this.$el.find('.j-line');

            var width = lineElement.width();

            this.centerPosition = Math.round(width / 2);

            var minDate = this.getMinDate();
            var maxDate = this.getMaxDate();

            var nextPoint = this.centerDate.clone();
            nextPoint.add(gradation.code, gradation.value);
            while (nextPoint.unix() < maxDate.unix()) {
                this.renderDateOnAxis(nextPoint);
                nextPoint.add(gradation.code, gradation.value);
            }
            
            var prevPoint = this.centerDate.clone();
            prevPoint.subtract(gradation.code, gradation.value);
            while (prevPoint.unix() > minDate.unix()) {
                this.renderDateOnAxis(prevPoint);
                prevPoint.subtract(gradation.code, gradation.value);
            }
            
            this.renderDateOnAxis(this.defaultCenter);
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
        
        /**
         * 
         */
        calcDatePosition: function(date) {
            return this.centerPosition + Math.round(date.diff(this.centerDate, this.scale.code) / this.periodInPixel);
        },
        
        getMinDate: function() {
            return this.centerDate.clone().subtract(this.scale.code, (this.$el.width() / 2) * this.periodInPixel);
        },

        getMaxDate: function() {
            return this.centerDate.clone().add(this.scale.code, (this.$el.width() / 2) * this.periodInPixel);
        },

        setScale: function(scale) {
            this.scale = scale;
        },

        /**
         * Events
         */
        
        onMouseDown: function() {
            console.log('down');
            this.mouseDown = true;
        },
        
        onMouseUp: function() {
            console.log('up');
            this.mouseDown = false;
        },
        
        onMouseMove: function() {
            if (this.mouseDown) {
                console.log('move');
            }
        },
        
        onShow: function() {
            this.renderDates();
        },
        
        onChangeScale: function(scale) {
            this.setScale(scale);
            this.renderDates();
        }
    });
})