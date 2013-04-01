define(
    [
        'modules/editor/module',
        'modules/viewer/module'
    ],
    function(
        Editor,
        Viewer
    ) {
        return {
            'editor'    : Editor,
            'viewer'    : Viewer
        };
    }
);