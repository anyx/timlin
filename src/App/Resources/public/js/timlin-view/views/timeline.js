define(['marionette', 'models/timeline', 'text!templates/timeline.phtml'], function(Marionette, Timeline, template) {
    
    return Marionette.ItemView.extend({
        
        scaleCode: 'days',
        
        periodInPixel: 1,
        
        defaultCenter: new moment(),
        
        centerDate: new moment(),
        
        centerPosition: 0,
        
        template: function() {
            return _.template(template, this.model);
        },
        
        renderDates: function() {
            var lineElement = this.$el.find('.j-line');
            
            var width = lineElement.width();
            
            this.centerPosition = Math.round(width / 2);
            
            this.renderDateOnAxis(this.defaultCenter);
            this.renderDateOnAxis(this.getLeftDate());
            this.renderDateOnAxis(this.getRightDate());
        },
        
        renderDateOnAxis: function(date) {
            var dateHint = $('<span class="b-date-hint"><span class="b-date-hint-value">'+ date.format('DD.MM.YYYY') +'</span></span>');
            dateHint.css({
                left: this.calcDatePosition(date) + 'px'
            });
            
            dateHint.appendTo(this.$el.find('.j-axis'));
        },
        
        calcDatePosition: function(date) {
            return this.centerPosition + Math.round(date.diff(this.centerDate, this.scaleCode) / this.periodInPixel);
        },
        
        getLeftDate: function() {
            return this.centerDate.clone().add(this.scaleCode, -this.centerPosition * this.periodInPixel);
        },

        getRightDate: function() {
            return this.centerDate.clone().add(this.scaleCode, this.centerPosition * this.periodInPixel);
        },

        onShow: function() {
            this.$el.find('.j-scale-slider').rangeinput({ progress: true, max: 100 });
            
            this.renderDates();
        }
    });
})