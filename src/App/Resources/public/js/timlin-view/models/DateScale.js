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
            'hours',
            'days',
            'weeks',
            'months',
            'years'
        ],

        scaleCode       : 'days',
        
        value           : 50,
        
        segmentWidth    : 100,
        
        getAvailableScales: function() {
            return _.union(this.defaultScaleCodes, _.keys(this.scaleSizes));
        },
        
        setValue: function(value) {
            this.value = value;
            this.trigger('change', this);
        },
        
        getValue: function() {
            return this.value;
        },
        
        getSegmentWidth: function() {
            return this.segmentWidth;
        },
        
        setScaleCode: function(scaleCode) {
            this.scaleCode = scaleCode;
            this.trigger('change', this);
        },
        
        getScaleCode: function() {
            return this.scaleCode;
        },
        
        getPrevScaleCode: function(scaleCode) {
            var codes = this.getAvailableScales();
            var scaleIndex = _.indexOf(codes, scaleCode);
            if (scaleIndex == -1) {
                throw new Error('Scale "' + scaleCode + '" is not registered');
            }
            
            if (scaleIndex > 0) {
                scaleIndex--;
            }
            
            return codes[scaleIndex];
        }
    });
})
  
