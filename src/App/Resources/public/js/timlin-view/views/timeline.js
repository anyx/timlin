define(['marionette', 'models/timeline', 'text!templates/timeline.phtml'], function(Marionette, Timeline, template) {
    
    return Marionette.ItemView.extend({
        
        daysInPixel: 10,
        
        defaultCenter: new moment(),
        
        center: new moment(),
        
        centerPosition: 0,
        
        template: function() {
            return _.template(template, this.model);
        },
        
        renderDates: function() {
            var lineElement = this.$el.find('.j-line');
            
            var width = lineElement.width();
            
            this.centerPosition = Math.round(width / 2);
            
            this.renderDateOnAxis(this.defaultCenter);
        },
        
        renderDateOnAxis: function(date) {
            var dateHint = $('<span class="b-date-hint">'+ date.format('DD.MM.YYYY') +'</span>');
            dateHint.css({
                left: this.calcDatePosition(date) + 'px'
            });
            
            dateHint.appendTo(this.$el.find('.j-axis'));
        },
        
        calcDatePosition: function(date) {
            console.log(date)
            return this.centerPosition + Math.round(date.diff(this.center, 'days') / this.daysInPixel);
        },
        
        onShow: function() {
            this.renderDates();
        }
    });
})