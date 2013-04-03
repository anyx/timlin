describe('Timeline scale & position', function() {

    beforeEach(function() {
        var that = this;
        var loaded = false;
        
        require(['./models/DateScale', './models/GradationChooser'], function(DateScale, GradationChooser) {
            that.dateScale = new DateScale;
            that.gradationChooser = new GradationChooser;
            
            loaded = true;
        });
        
        waitsFor(function() {
            return loaded;
        });
    });
    //
    it('Correct determination previous scale code', function() {
        expect(this.dateScale.getPrevScaleCode('years')).toBe('months');
        expect(this.dateScale.getPrevScaleCode('months')).toBe('weeks');
        expect(this.dateScale.getPrevScaleCode('days')).toBe('hours');
        expect(this.dateScale.getPrevScaleCode('hours')).toBe('minutes');
    });
    //
    it('Correct calc timeline segment duration', function() {
        this.dateScale.setValue(20);
        this.dateScale.setScaleCode('years');
        
        this.gradationChooser.minSegmentWidth = 100;
        
        expect(this.gradationChooser.calcSegmentDuration(this.dateScale).asMonths()).toEqual(100);
    });
})

