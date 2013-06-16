define(['marionette', 'module', 'tpl!./../templates/Workspace.phtml'], function(Marionette, module, template) {
    return Marionette.ItemView.extend({
        
        className: 'b-editor__workspace-content',
        
        template: template,

        previewUrl: module.config().previewUrl,
        
        initialize: function() {
            var _this = this;
            this.model.on('change:current_version_id', function(){
                _this.render();
            });
        },
        
        onRender: function() {
            var contentIframe = this.$el.find('iframe');
            contentIframe.attr('src', this.getPreviewUrl(this.model.id));
            
            var iframeLoading = new $.Deferred();
            contentIframe    
                .load(function() {
                    iframeLoading.resolve();
                })
            ;
        },
        
        getPreviewUrl: function(id) {
           return this.previewUrl.split(':id').join(id);
        }
    });
});