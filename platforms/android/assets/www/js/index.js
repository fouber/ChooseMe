define(function(require){

    FastClick.attach(document.body);

    $(document.body).on('touchstart', '.btn', function(){
        $(this).addClass('active');
    });

    $(document.body).on('touchend', '.btn', function(){
        $(this).removeClass('active');
    });

    var page = require('page');
    var info = require('info');
    var number = require('number');

    var $home = $('#home');
    $home.on('touchstart', function(){
        $(this).css('margin-top', '5px');
    });
    $home.on('touchend', function(){
        $(this).css('margin-top', '0');
        page.show('index');
    });

    setTimeout(function(){
        page.show('index');
//        require('finger').show('把手指放上去');
        $('#menu').on('touchend', 'a[data-type]', function(){
            var $this = $(this);
            info.type = $this.data('type');
            var text = $this.text();
            switch (info.type){
                case 'zxh':
                    break;
                case 'dmx':
                    break;
                case 'sfz':
                    number.show(info.text = text);
                    break;
                case 'tsd':
                    number.show(info.text = text);
                    break;
            }
        });
    }, 100);
});