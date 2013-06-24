define(
    [
        'marionette',
        'app',
        'tpl!templates/DocumentPanel.tpl',
        'views/VersionChooser'
    ],
    function(
        Marionette,
        app,
        template,
        VersionChooserView
    ) {
    
    return Marionette.ItemView.extend({
        
        template: template,

        events: {
            'click .j-choose-version-button'    : 'onClickChooseVersion',
            'keyup .j-document-title'           : 'onKeyUpSetTitle',
            'keyup .j-document-description'     : 'onKeyUpSetDescription',
            'click .j-save-document-button'     : 'onClickSaveDocument',
            'click .j-publish-document-button'  : 'onClickChangePubclity'
        },

        initialize: function() {
            var _this = this;
            this.model.on('change:current_version_id', function() {
                _this.render();
            });
            this.model.on('sync', function() {
                _this.render();
            });
        },
        
        serializeData: function() {
            return {
                document : this.model
            };
        },
        
        onClickChooseVersion: function() {
            app.dialog(
                'Versions',
                new VersionChooserView({
                    model   : this.model
                })
            ).show();

            return false;  
        },
        
        onKeyUpSetDescription: function(event) {
            this.model.set('description', $(event.currentTarget).val());
        },

        onKeyUpSetTitle: function(event) {
            this.model.set('title', $(event.currentTarget).val());
        },
        
        onClickSaveDocument: function() {
            app.loader('Saving document...', this.model.save());
        },

        onClickChangePubclity: function(event) {
            this.model.setPublished($(event.currentTarget).data('value'));
            app.loader('Saving document...', this.model.save());
        }
    });
})