define(
    [
        'marionette',
        'tpl!./templates/Layout.tpl',
        'app'
    ],
    function(
        Marionette,
        template,
        application
    ) {

    return Marionette.Layout.extend({

        template        : template,

        className       : 'b-index-layout',

        events          : {
            'click .j-create-article': 'onClickCreateArticle'
        },

        serializeData   : function() {
            return {
                application : this.options.application
            };
        },
        
        regions: {
        },
        
        onShow: function() {
        },
        
        onClickCreateArticle: function() {
            var createDeffered = new $.Deferred();
            
            var entity = application.getEntityManager().createEntity(
                'Article',
                {
                    title: 'Новый материал'
                },
                createDeffered
            );
            createDeffered.done(function(){
                application.getRouter().navigateToRoute('article-edit', {id:entity.id}, true);
            });
            
            application.loader('Создание статьи...', createDeffered);
            return false;
        }
   });
});
