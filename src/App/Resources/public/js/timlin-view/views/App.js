define(
    ['anyx/view', 'tpl!templates/App.phtml'],
    function(AnyxView, template){
        return AnyxView.extend({
            template: template
        });
    }
);