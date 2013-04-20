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
        
        getContentFrame : function() {
            return this.$el.find('.j-article-content');
        }
   });
});
