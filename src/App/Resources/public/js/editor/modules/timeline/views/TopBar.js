define(['marionette', './widgets/loader', 'tpl!../templates/TopBar.tpl'], function(Marionette, widgets, template) {
    
    return Marionette.ItemView.extend({
        template        : template,
        
        widgets         : {},
        
        initialize      : function() {
            _.each(widgets, function(widget){
                this.registerWidget(widget);
            }, this);
        },
        
        getLayout  : function() {
            return this.options.layout
        },
        
        registerWidget  : function(widget) {
            this.widgets[widget.getName()] = widget;
            widget.setLayout(this.getLayout());
        },
        
        showWidgets : function() {
            _.each(this.widgets, function(widget){
                widget.$el.appendTo(this.getWidgetsContainer());
                widget.render();
            }, this);
        },
        
        getWidgetsContainer: function() {
            return this.$el.find('.j-widgets-container');
        },
        
        onShow : function() {
            this.showWidgets();
        }
    });
});
    