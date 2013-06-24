define(
    [
        'app',
        './Controller',
        './Layout',
        './models/ArticleCollection'
    ],
    function(app, Controller, Layout, ArticleCollection) {
  
        app.getEntityManager().registerCollection('Article', new ArticleCollection);

        return app.module('article', function() {

            this.startWithParent = false;

            this.controllers  = [
                new Controller({
                    Layout  : Layout
                })
            ]
        });
    }
);