define('finger', function(require, exports){

    var page = require('page');
    var info = require('info');

    var WIDTH = document.body.clientWidth;
    var HEIGHT = document.body.clientHeight - 100;
    var RADIUS = 45;
    var OFFSET = 1000 - RADIUS;

    $(document.body).on('touchstart', '.finger', function(e){
        $(this).addClass('on');
        e.preventDefault();
        e.stopPropagation();
    });

    $(document.body).on('touchend', '.finger', function(e){
        $(this).removeClass('on');
        e.preventDefault();
        e.stopPropagation();
    });

    exports.tip = function(num){
        $('#tip').html('还差 <span>' + num + '</span> 根手指！');
    };

    exports.showFingers = function(){
        $('.finger').each(function(){
            this.style.webkitTransform = $(this).data('style');
        });
    };

    exports.show = function(title){
        var fingers = $('#fingers');
        fingers.html('');
        this.tip(info.number);
        var num = info.number;
        var html = '';
        var step = 2 * Math.PI / num;
        var a = WIDTH / 3.5;
        var b = HEIGHT / 3.5;
        var x0 = WIDTH / 2 + OFFSET;
        var y0 = HEIGHT / 2 + OFFSET;
        var angle = Math.PI / 2;
        for(var i = 0; i < num; i++){
            var x = Math.floor(a * Math.cos(angle)) + x0;
            var y = Math.floor(b * Math.sin(angle)) + y0;
            var x2 = Math.floor(WIDTH * Math.cos(angle)) + x0;
            var y2 = Math.floor(HEIGHT * Math.sin(angle)) + y0;
            var deg = Math.floor( angle * 180 / Math.PI - 90 );
            var style = '-webkit-transition-delay:' + 0.5 * Math.random() + 's;';
            style += '-webkit-transform:';
            style += 'translate3d(' + x2 + 'px,' + y2 + 'px,0) ';
            style += 'rotate3d(0,0,1,' + deg + 'deg)';
            var dStyle = 'translate3d(' + x + 'px,' + y + 'px,0) ';
            dStyle += 'rotate3d(0,0,1,' + deg + 'deg)';
            html += '<div class="finger" data-style="' + dStyle + '" style="' + style + '"></div>';
            angle+= step;
        }
        fingers.html(html);
        page.show('fingers', title);
        setTimeout(function(){
            exports.showFingers();
        }, 500);
    };
});