define(['module', './Article'], function(module, Article) {
    
    return Backbone.Collection.extend({
        
        model:  Article, 
        
        url: module.config().url
    });
});