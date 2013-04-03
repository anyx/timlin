define(['backbone'], function(Backbone) {
  
    return Backbone.Model.extend({

        minSegmentWidth    : 100,

        calcSegmentDuration: function(dateScale) {
            var duration = moment.duration(dateScale.getValue(), dateScale.getScaleCode());
           
            var durationScaleCode = dateScale.getScaleCode();
            if (dateScale.getValue() * dateScale.getSegmentWidth() < this.minSegmentWidth) {
                durationScaleCode = dateScale.getPrevScaleCode(dateScale.getScaleCode());
            }
            var currentDurationMethod = 'as' + this.ucfirst(durationScaleCode);
            var durationValue = this.roundValue(duration[currentDurationMethod]());
            
              
            while (durationValue > this.minSegmentWidth) {
                durationValue = Math.ceil(durationValue / 5);
            }
 
            return {
                scaleCode   : durationScaleCode,
                value       : this.roundValue(durationValue)
            };
        },
        
        roundValue  : function(value) {
            var denominator = this.calcDenominator(value);
            return Math.floor(value / denominator) * denominator;
        },
        
        ucfirst: function (str) {
            var f = str.charAt(0).toUpperCase();
            return f + str.substr(1, str.length-1);
        },
        
        calcDenominator: function(number) {
            var denominator = 1;
            while (number > 10) {
                number = number / 10;
                denominator = denominator * 10
            }
            return denominator;
        }
    });
})
  
