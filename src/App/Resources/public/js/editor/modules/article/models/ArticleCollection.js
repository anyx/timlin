define(['app', 'module', './Article'], function(app, module, Article) {
    
    return Backbone.Collection.extend({
        
        model:  Article, 
        
        url: module.config().url
    });
});