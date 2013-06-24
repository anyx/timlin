define(
    [
        'marionette',
        'tpl!./../templates/DocumentView.tpl',
        'app',
    ],
    function(
        Marionette,
        template,
        app
    ) {

    return Marionette.ItemView.extend({

        template: template,
        
        onShow: function() {
            var documentContent = this.options.versionId;
            
            console.log(documentContent, this.options);
            
            //app.loader('Content loading...', '') 
        },
        
        onRender: function() {
        }
    })
});

