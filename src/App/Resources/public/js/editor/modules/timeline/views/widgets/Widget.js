define(['marionette', 'tpl!../../templates/widgets/Widget.phtml'], function(Marionette, template) {
    
    return Marionette.ItemView.extend({
        
        template: template, 

        layout  : null,
        
        setLayout: function(layout) {
            this.layout = layout;
        },
        
        getLayout: function() {
            return this.layout;
        },
        
        serializeData: function(){
            return {
                title   : this.getTitle(),
                name    : this.getName()
            }
        },
        
        getTitle: function() {
            return 'Abstract Widget';
        },
        
        initialize: function() {
            
        },
        
        showHelp: function() {
            
        }
    });
});
    