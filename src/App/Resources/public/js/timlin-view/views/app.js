define(
    ['anyx/view', 'tpl!templates/app.phtml'],
    function(AnyxView, template){
        return AnyxView.extend({
            template: template
        });
    }
);