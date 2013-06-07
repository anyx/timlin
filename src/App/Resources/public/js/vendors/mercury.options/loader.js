define(['mercury', 'module'], function(Mercury, module){
    return {
        id  : module.config().id,
        configuration: {
            saving: {
                url: module.config().url,
                method: 'PUT'
            }
        }
    };
})


