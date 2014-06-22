(function(global){
    var factories = {};
    var modules = {};
    global.define = function(id, factory){
        switch (typeof id){
            case 'string':
                if(typeof factory === 'function'){
                    factories[id] = factory;
                } else {
                    modules[id] = factory;
                }
                break;
            case 'function':
                id(require);
                break;
        }
    };
    var require = function(id){
        if(modules.hasOwnProperty(id)){
            return modules[id];
        } else if(factories.hasOwnProperty(id)) {
            var module = {};
            var exports = module.exports = modules[id] = {};
            var ret = factories[id](require, exports, module);
            modules[id] = typeof ret === 'undefined' ? module.exports : ret;
            return modules[id];
        } else {
            throw 'undefined module [' + id + ']';
        }
    };
})(window);
