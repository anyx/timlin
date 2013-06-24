define(
    [
        'marionette',
        'tpl!templates/VersionChooser.tpl',
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
        
        lastVersionId: null,
        
        events: {
            'click .j-create-version-btn'   : 'onClickCreateVersion',
            'click .j-save-version-btn'     : 'onClickSaveVersion',
            'click .j-switch-version-btn'   : 'onClickSwitchVersion',
            'click .j-remove-version-btn'   : 'onClickRemoveVersion',
            'change .j-version-select'      : 'onSelectVersion'
        },
        
        initialize: function() {
            this.lastVersionId = null;
        },
        
        serializeData: function() {
            return {
                document : this.model,
                lastVersionId: this.lastVersionId
            };
        },
        
        setDialog: function(dialog) {
            this.dialog = dialog;
        },
        
        getDialog: function() {
            return this.dialog;
        },
        
        onRender: function() {
            var selectedVersionId = !_.isNull(this.lastVersionId) ? this.lastVersionId : this.model.getCurrentVersionId();
            this.showVersionInfo(this.model.getVersion(selectedVersionId));
        },
        
        showVersionInfo: function(version) {
            this.versionView = new VersionInfoView({
                el      : this.$el.find('.j-version-data'),
                model   : version
            }).render();
            
            this.versionView.on('version:change', function() {
                this.setSaveDisabled(false);
            }, this);
            
            this.versionView.on('version:select', function(versionId) {
                this.$el.find('.j-version-select')
                    .val(versionId)
                    .change();
            }, this);

            this.setSaveDisabled(true);
            
            var isCurrentVersion = this.model.getVersion(this.getSelectedVersionId()).isCurrentDocumentVersion();
            this.setChangeDisabled(isCurrentVersion);
            this.setDeleteDispabed(isCurrentVersion)
        },
        
        setSaveDisabled: function(disabled) {
            this.setButtonDisabled('.j-save-version-btn', disabled);
        },

        setChangeDisabled: function(disabled) {
            this.setButtonDisabled('.j-switch-version-btn', disabled);
        },

        setDeleteDispabed: function(disabled) {
            this.setButtonDisabled('.j-remove-version-btn', disabled);
        },
        
        setButtonDisabled: function(selector, disabled) {
            this.$el.find(selector).attr('disabled', disabled ? 'disabled': null);
        },

        onClickCreateVersion: function() {
            var _this = this;
            
            var dialog = this.getDialog();
            dialog.showInfo('Saving...');
            dialog.disableClosing();

            var childVersion = this.model.createChildVersion(this.model.getVersion(this.getSelectedVersionId()));
            childVersion
                .save()
                .success(function(updatedDocument){
                    _this.model
                        .clearVersions()
                        .set(updatedDocument);
                    _this.render();
                    dialog.showSuccess('Version succesfully saved');
                    dialog.enableClosing();
                })
                .error(function(){
                    dialog.showError('Version was not saved');
                    dialog.enableClosing();
                })
        },
        
        onClickSaveVersion: function() {
            var _this = this;
            
            var dialog = this.getDialog();
            dialog.showInfo('Saving...');
            dialog.disableClosing();
            
            this.lastVersionId = this.getSelectedVersionId();
            this.model.getVersion(this.getSelectedVersionId())
                .save()
                .success(function(updatedDocument){
                    _this.model
                        .clearVersions()
                        .set(updatedDocument);
                    _this.render();
                    dialog.showSuccess('Version succesfully saved');
                    dialog.enableClosing();
                })
                .error(function(){
                    dialog.showError('Version was not saved');
                    dialog.enableClosing();
                })
        },
        
        onClickSwitchVersion: function() {
            var _this = this;
            this.model
                .requestChangeVersion(this.getSelectedVersionId())
                .success(function(){
                    _this.getDialog().hide();
                })
                .error(function(){
                    _this.getDialog().showError('Version was not changed');
                })
        },
        
        onClickRemoveVersion: function() {
            var _this = this;
            var dialog = this.getDialog();
            dialog.showInfo('Remove version...');
            dialog.disableClosing();
            
            this.model.getVersion(this.getSelectedVersionId())
                .destroy()
                .success(function(updatedDocument){
                    _this.model
                        .clearVersions()
                        .set(updatedDocument);
                    _this.render();
                    dialog.showSuccess('Version succesfully removed');
                    dialog.enableClosing();
                })
                .error(function(){
                    dialog.showError('Version was not removed');
                    dialog.enableClosing();
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