define('page', function(require, exports){

    //var histroy = [];
    var info = require('info');
    var pages = {};
    var current = 'index';
    var listeners = {};

    $('.view[data-page]').each(function(index, page){
        page = $(page);
        var name = page.data('page');
        if(pages.hasOwnProperty(name)){
            throw  'redeclare page [' + name + ']';
        } else {
            pages[name] = page;
        }
    });

    exports.on = function(type, fn){
        var listener = listeners[type] || [];
        for(var i = 0; i < listener.length; i++){
            if(fn === listener[i]){
                return;
            }
        }
        listener.push(fn);
        listeners[type] = listener;
    };

    exports.off = function(type, fn){
        if(listeners.hasOwnProperty(type)){
            var listener = [];
            $.each(listeners[type], function(index, handler){
                if(fn !== handler){
                    listener.push(fn);
                }
            });
            listeners[type] = listener;
        }
    };

    exports.dispatch = function(type, data){
        if(listeners.hasOwnProperty(type)){
            $.each(listeners[type], function(index, handler){
                handler({ type: type, data: data });
            });
        }
    };

    exports.home = function(e){
        if(current === 'index' && navigator.app && navigator.app.exitApp){
            navigator.app.exitApp();
        } else {
            if(info.canGoHome){
                info.choosing = false;
                $('#fingers').html('');
                exports.show('index');
            }
            if(e && e.preventDefault){
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };

    var WIDTH = document.body.clientWidth - 2 * 26;

    exports.title = function(text){
        if(text){
            $('.header .title').each(function(){
                var $this = $(this);
                if($this.hasClass('show')){
                    $this.removeClass('show');
                } else {
                    var size = Math.floor(WIDTH / text.length);
                    size = Math.min(Math.max(12, size), 40);
                    $this
                        .css('font-size', size + 'px')
                        .html(text)
                        .addClass('show');
                }
            });
        }
    };

    exports.getCurrentPageName = function(){
        return current;
    };

    exports.show = function(name, title){
        if(pages.hasOwnProperty(name)){
            var page = pages[name];
            if(!page.hasClass('active')){
                exports.dispatch('before_show', { current: current, next: name });
                $.each(pages, function(key, page){
                    if(key === name){
                        page.addClass('active');
                    } else {
                        page.removeClass('active');
                    }
                });
                if(name === 'index'){
                    $(document.body).removeClass('show-home');
                } else {
                    if(current === 'sub'){
                        $('#sub-menu').html('');
                    }
                    $(document.body).addClass('show-home');
                }
                this.title(title || page.data('title'));
                var prev = current;
                current = name;
                exports.dispatch('after_show', { current: current, prev: prev });
                return page;
            }
        } else {
            throw 'undefined page [' + name + ']';
        }
    };
});