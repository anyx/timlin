define(
    [
        'app',
        './Controller',
        './Layout',
        './models/ArticleCollection'
    ],
    function(application, Controller, Layout, ArticleCollection) {
  
        application.getEntityManager().registerCollection('Article', new ArticleCollection);

        return application.module('article', function() {

            this.startWithParent = false;

            this.controllers  = [
                new Controller({
                    Layout  : Layout
                })
            ]
        });
    }
);