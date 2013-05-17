define(['marion/Application', 'marion/EntityManager'], function(Application, EntityManager) {

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
        
        showError : function(text) {
            alert(text);
        }
    });
});