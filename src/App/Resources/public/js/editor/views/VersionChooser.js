define(
    [
        'marionette',
        'tpl!templates/VersionChooser.phtml',
        'views/VersionInfo'
    ],
    function(
        Marionette,
        template,
        VersionInfoView
    ) {
    return Marionette.ItemView.extend({
        template: template,
        
        dialog: null,
        
        versionView : null,
        
        events: {
            'click .j-create-version-btn'   : 'onClickCreateVersion',
            'click .j-save-version-btn'     : 'onClickSaveVersion',
            'change .j-version-select'      : 'onSelectVersion'
        },
        
        serializeData: function() {
            return {
                document : this.model
            };
        },
        
        setDialog: function(dialog) {
            this.dialog = dialog;
        },
        
        getDialog: function() {
            return this.dialog;
        },
        
        onRender: function() {
            this.showVersionInfo(this.model.getCurrentVersion());
        },
        
        showVersionInfo: function(version) {
            this.versionView = new VersionInfoView({
                el      : this.$el.find('.j-version-data'),
                model   : version
            }).render();
            
            this.versionView.on('version:change', function(version) {
                this.setSaveDisabled(false);
            }, this);
            
            this.setSaveDisabled(true);
        },
        
        setSaveDisabled: function(disabled) {
            this.$el.find('.j-save-version-btn').attr('disabled', disabled ? 'disabled': null);
        },
        
        onClickCreateVersion: function() {
            var _this = this;
            
            var dialog = this.getDialog();
            dialog.showInfo('Saving...');
            dialog.disableClosing();

            var childVersion = this.model.createChildVersion(this.model.getCurrentVersion());
            childVersion
                .save()
                .success(function(updatedDocument){
                    _this.model
                        .clearVersions()
                        .set(updatedDocument);
                    _this.render();
                    dialog.showSuccess('Version succesfully saved');
                })
                .error(function(){
                    dialog.showError('Version was not saved');
                })
        },
        
        onClickSaveVersion: function() {
            var _this = this;
            
            var dialog = this.getDialog();
            dialog.showInfo('Saving...');
            dialog.disableClosing();
            
            this.model.getVersion(this.getSelectedVersionId())
                .save()
                .success(function(updatedDocument){
                    _this.model
                        .clearVersions()
                        .set(updatedDocument);
                    _this.render();
                    dialog.showSuccess('Version succesfully saved');
                })
                .error(function(){
                    dialog.showError('Version was not saved');
                })
        },
        
        onSelectVersion: function() {
            this.showVersionInfo(this.model.getVersion(this.getSelectedVersionId()));
        },
        
        getSelectedVersionId: function() {
            return this.$el.find('.j-version-select').find(':selected').val();
        }
    });
})