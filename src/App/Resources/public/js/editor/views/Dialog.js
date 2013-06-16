define(['marionette', 'tpl!templates/Dialog.phtml'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        
        template: template,

        events: {
            'click .j-dialog-close' : 'onClickCloseButton'
        },

        closingEnabled: true,

        serializeData: function() {
            return {
                title   : this.options.title
            };
        },
        
        initialize: function() {
            if (_.isFunction(this.getContentView().setDialog)) {
                this.getContentView().setDialog(this);
            }
        },
        
        getContentView: function() {
            return this.options.content;
        },

        disableClosing: function() {
            this.closingEnabled = false;
        },
        
        enableClosing: function() {
            this.closingEnabled = true;
        },

        canClose: function() {
            return this.closingEnabled;
        },

        onRender: function() {
            var contentEl = this.getContentView().render();
            this.$el.find('.j-dialog-content').html(contentEl.$el);
        },

        show: function() {
            this.$el.modal();
        },

        hide: function() {
            if (!this.canClose()) {
                return;
            }
            this.$el.modal('hide');
        },
        
        /**
         * Events
         */
        showError: function(text) {
            return this.alert('error', text);
        },

        showInfo: function(text) {
            return this.alert('info', text);
        },

        showSuccess: function(text) {
            return this.alert('success', text);
        },
        
        alert: function(type, text) {
            this.$el.find('.j-dialog-alert')
                .empty()
                .append('<div class="alert alert-'+type+'">'+text+'</div>');
                
            return this;
        },

        onClickCloseButton: function() {
            this.hide();
            return false;
        }
    });
});