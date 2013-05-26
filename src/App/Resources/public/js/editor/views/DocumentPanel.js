define(
    [
        'marionette',
        'app',
        'tpl!templates/DocumentPanel.phtml',
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
            'click .j-choose-version-button' : 'onClickChooseVersion'
        },

        initialize: function() {
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
        }
    });
})