define(['marion', 'views/Dialog'], function(Marion, DialogView) {

    return Marion.Application.extend({

        entityManager: new Marion.EntityManager(),

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