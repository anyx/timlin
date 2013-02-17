define(['backbone'], function(Backbone) {
  
    return Backbone.Model.extend({

        scaleSizes  : {
            decade  : {
                code    : 'years',
                scale   : 10
            },
            century : {
                code    : 'years',
                scale   : 100
            }
        },

        defaultScaleCodes: [
            'milliseconds',
            'seconds',
            'minutes',
            'days',
            'weeks',
            'hours',
            'months',
            'years'
        ],

        scaleCode       : 'seconds',
        
        value           : 50,
        
        getAvailableScales: function() {
            return _.union(this.defaultScaleCodes, _.keys(this.scaleSizes));
        },
        
        /**
         * 
         */
        getScale: function() {
            
            var originalScale = this.scaleCode;
            var scaleCode = this.scaleCode;
            var value = this.value;
            
            if (_.indexOf(this.defaultScaleCodes, scaleCode) == -1) {
                value = value * this.scaleSizes[scaleCode]['scale'];
                scaleCode = this.scaleSizes[scaleCode]['code'];
            }
            
            return {
                code                : scaleCode,
                value               : value,
                originalScaleCode   : originalScale
            }
        },
        
        setValue: function(value) {
            this.value = value;
            this.trigger('change', this.getScale());
        },
        
        setScaleCode: function(scaleCode) {
            this.scaleCode = scaleCode;
            this.trigger('change', this.getScale());
        }
    });
})
  
