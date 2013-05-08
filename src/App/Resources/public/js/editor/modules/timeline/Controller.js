define(['marion/Controller', './models/Timeline'], function(Controller, Timeline) {

    return Controller.extend({
        
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
                    _this.setLayout(new _this.options.Layout);
                })
                .error(function(){
                })
        }
    });
});

