define(
    [
        'marionette',
        'tpl!./templates/Layout.phtml'
    ],
    function(
        Marionette,
        template
    ) {

    return Marionette.Layout.extend({

        template        : template,

        className       : 'b-index-layout',

        serializeData   : function() {
            return {
                application : this.options.application
            };
        },
        
        regions: {
        },
   });
});
