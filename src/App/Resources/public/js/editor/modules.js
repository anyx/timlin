define(
    [
        'modules/index/module',
        'modules/timeline/module',
        'modules/map/module',
        'modules/article/module',
    ],
    function(
        Index,
        Timeline,
        Map,
        Article
    ) {
        return {
            'index'     : Index,
            'timeline'  : Timeline,
            'map'       : Map,
            'article'   : Article
        };
    }
);