define(
    [
        'modules/index/module',
        'modules/editor/module',
        'modules/viewer/module'
    ],
    function(
        Index,
        Editor,
        Viewer
    ) {
        return {
            'index'     : Index,
            'editor'    : Editor,
            'viewer'    : Viewer
        };
    }
);