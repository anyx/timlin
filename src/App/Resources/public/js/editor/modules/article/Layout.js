define(
    [
        'marionette',
        'app',
        'tpl!./templates/Layout.phtml'
    ],
    function(
        Marionette,
        app,
        template
    ) {

    return Marionette.Layout.extend({
        template        : template,
        className       : 'b-article-layout',
        regions         : {
            documentPanel: app.options['document-panel']
        },
        getContentFrame : function() {
            return this.$el.find('.j-article-content');
        }
   });
});
