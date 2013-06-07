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
        },
        
        onClickCreateVersion: function() {
            var dialog = this.getDialog();
            dialog.showInfo('Saving...');
            dialog.disableClosing();
            
            var childVersion = this.model.createChildVersion(this.model.getCurrentVersion());
            childVersion
                .save()
                .success(function(){
                    dialog.showSuccess('Version succesfully saved');
                })
                .error(function(){
                    console.log(arguments);
                    dialog.showError('Version was not saved');
                })
        },
        
        onSelectVersion: function(event) {
            var versionId = $(event.target).find(':selected').val();
            this.showVersionInfo(this.model.getVersion(versionId));
        }
    });
})