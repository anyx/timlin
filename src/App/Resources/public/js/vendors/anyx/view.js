define(
    ['backbone'],
    function(Backbone) {
        return Backbone.View.extend({
            
            initialize: function(options) {
            },
            
            render: function(options) {
                this.$el.html(_.template(this.template, this.model));
                return this;
            }
        });
    }
);