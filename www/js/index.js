define(function(require){

    window.onerror = function(){
        var str = [
            '错误: ' + arguments[0],
            '文件: ' + arguments[1],
            '行号: ' + arguments[2]
        ].join('\n');
        alert(str);
    };

    $(document.body).on('touchstart', '.btn', function(){
        $(this).addClass('active');
    });

    $(document.body).on('touchend', '.btn', function(){
        $(this).removeClass('active');
    });

    setTimeout(function(){
        require('menu').render('#menu', 'menu');
        require('page').show('index');
    }, 100);
});