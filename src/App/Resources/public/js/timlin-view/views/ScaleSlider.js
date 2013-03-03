define(['marionette', 'tpl!templates/ScaleSlider.phtml'], function(Marionette, template) {
    
     return Marionette.ItemView.extend({
        
        events      : {
            'click .j-code-value' : 'onScaleChange'
        },
        
        selectedClass   : 'b-selected',
        
        template    : template,
        
        /**
         * 
         */
        serializeData: function(){
            return {
                dateScale   : this.model
            }
        },

        onShow: function() {
            var slider = this;
            
            this.$el.find('.j-slider').slider({
                max         : 99,
                min         : 0,
                value       : this.model.getValue(),
                orientation : 'vertical',
                start       : function(event) {
                    event.stopPropagation();
                },
                slide       : function(event, ui) {
                    slider.model.setValue(100 - ui.value);
                }
            });
        },
        
        onScaleChange: function(event) {
            this.$el.find('.j-code-value').removeClass(this.selectedClass)
            var target = $(event.currentTarget).addClass(this.selectedClass);
            this.model.setScaleCode(target.data('code'));
        }
     });
})
