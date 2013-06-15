define(['marion', './models/Timeline'], function(Marion, Timeline) {

    return Marion.Controller.extend({
        
        routes : {
            'timeline-edit'  : {
                'pattern'   : 'editor/timeline/:id',
                'action'    : 'editAction'
            }
        },
        
        editAction : function(id) {
            var timeline = new Timeline({
                id  : id
            });
            var _this = this;
            
            timeline.fetch()
                .success(function() {
                    _this.showLayout(new _this.options.Layout);
                })
                .error(function(){
                })
        }
    });
});

