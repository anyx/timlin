define(
    ['anyx/view', 'text!templates/app.phtml'],
    function(AnyxView, template){
        return AnyxView.extend({
            template: template
        });
    }
);