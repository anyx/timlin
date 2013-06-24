define(['marion'], function(Marion) {
    return Marion.Application.extend({

        showError : function(text) {
            alert(text);
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
        }
    });
});