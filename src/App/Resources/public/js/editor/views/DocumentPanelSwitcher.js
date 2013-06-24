define(['marionette', 'tpl!templates/DocumentPanelSwitcher.tpl'], function(Marionette, template) {
    return Marionette.ItemView.extend({
        template: template,
        
        events  : {
            'click .j-hide-document-button' : 'onClickHideDocumentButton'
        },

        onClickHideDocumentButton: function() {
            this.trigger('toggle-document-panel');
            this.$el.find('.j-hide-document-button').toggleClass('b-editor__hide-button__right');
            return false;
        }
    });
})