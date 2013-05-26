define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        
        getId: function() {
            return this.get('id')
        },
        
        getTitle: function() {
            var title = this.get('title');
            if (!title) {
                title = this.get('id');
            }
            return title;
        },
        
        isPublished: function() {
            return this.get('published');
        }
    })
});

