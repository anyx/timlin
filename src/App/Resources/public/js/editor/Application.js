define(['marion/Application', 'marion/EntityManager', 'views/Dialog'], function(Application, EntityManager, DialogView) {

    return Application.extend({

        entityManager: new EntityManager(),

        getEntityManager: function() {
            return this.entityManager;
        },

        loader  : function(text, deferred) {

            var modal = $('#j-loader').modal();
            
            modal.find('.j-text').text(text);
            var app = this;
            deferred
                .done(function() {
                    modal.modal('hide');
                })
                .fail(function() {
                    app.showError('Внутренная ошибка сервера');
                    modal.modal('hide');
                });
                
            return deferred;
        },
        
        dialog: function(title, contentView) {
            return new DialogView({
                el      : $(this.options.selectors['dialog']),
                title   : title,
                content : contentView
            }).render();
        },
        
        showError : function(text) {
            alert(text);
        }
    });
});