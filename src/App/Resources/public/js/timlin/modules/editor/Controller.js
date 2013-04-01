define(['marionette'], function(Marionette) {

    return Marionette.Controller.extend({
        
        routes : {
            'action/:id' : 'doSomething'
        },
        
        doSomething : function(id) {
            console.log('I do something', id, this);
        }
    });
});

