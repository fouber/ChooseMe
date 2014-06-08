define('page', function(require, exports){

    //var histroy = [];
    var pages = {};

    $('.view[data-page]').each(function(index, page){
        page = $(page);
        var name = page.data('page');
        if(pages.hasOwnProperty(name)){
            throw  'redeclare page [' + name + ']';
        } else {
            pages[name] = page;
        }
    });

    exports.title = function(text){
        if(text){
            $('.header .title').each(function(){
                var $this = $(this);
                if($this.hasClass('show')){
                    $this.removeClass('show');
                } else {
                    $this.html(text);
                    $this.addClass('show');
                }
            });
        }
    };

    exports.show = function(name, title){
        if(pages.hasOwnProperty(name)){
            var page = pages[name];
            if(!page.hasClass('active')){
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
                    $(document.body).addClass('show-home');
                }
                this.title(title || page.data('title'));
                return page;
            }
        } else {
            throw 'undefined page [' + name + ']';
        }
    };
});