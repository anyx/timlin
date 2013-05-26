define(['marionette', 'tpl!templates/Dialog.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        
        template: template,

        serializeData: function() {
            return {
                title   : this.options.title
            };
        },
        
        getContentView: function() {
            return this.options.content;
        },

        onRender: function() {
            var contentEl = this.getContentView().render();
            this.$el.find('.j-dialog-content').html(contentEl.$el);
        },

        show: function() {
            this.$el.modal();
        },
        
        hide: function() {
            this.$el.modal('hide');
        }
    });
});