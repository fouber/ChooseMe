define(function(require){

    $(document.body).on('touchstart', '.btn', function(){
        $(this).addClass('active');
    });

    $(document.body).on('touchend', '.btn', function(){
        $(this).removeClass('active');
    });

    var page = require('page');
    var info = require('info');
    var number = require('number');

    $('#home').on('touchend', function(){
        if(info.canGoHome){
            info.choosing = false;
            page.show('index');
            $('#fingers').html('');
        }
    });

    setTimeout(function(){
        page.show('index');
//        require('finger').show('把手指放上去');
        $('#menu').on('touchend', '.btn', function(){
            var $this = $(this);
            var type = $this.data('type');
            var text = $this.text();
            switch (type){
                case 'zxh':
                    break;
                case 'dmx':
                    break;
                default:
                    number.show(info.text = text);
                    break;
            }
        });
    }, 100);
});