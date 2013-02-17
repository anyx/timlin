define(['backbone'], function(Backbone) {
  
    return Backbone.Model.extend({

        gradations  : {
            century : {
                1   : {
                    code    : 'year',
                    value   : 100
                },
                50  : {
                    code    : 'year',
                    value   : 500
                }
            },
            decade  : {
                1   : {
                    code    : 'year',
                    value   : 10
                },
                50  : {
                    code    : 'year',
                    value   : 500
                }
            }
        },

        segmentWidth    : 100,

        findGradation: function(scale) {
            var gradation = {
                code    : scale.code,
                value   : scale.value
            }

            if (gradation.value in this.gradations) {
                for (var scaleValue in this.gradations[scale]) {
                    if (gradation.value > scaleValue) {
                        gradation.code = this.gradations[scale][scaleValue].code;
                        gradation.value = this.gradations[scale][scaleValue].value;
                    }
                }
            } else {
                if (scale.value < 10) {
                    ;
                } else if (scale.value < 40) {
                    gradation.value += 20;
                } else if (scale.value < 60) {
                    gradation.value += 40;
                } else {
                    gradation.value += 80
                }
            }

            return gradation;
        }
    });
})
  
