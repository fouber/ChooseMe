define('finger', function(require, exports){

    var page = require('page');
    var info = require('info');

    var WIDTH = document.body.clientWidth;
    var HEIGHT = document.body.clientHeight - 100;
    var RADIUS = 45;
    var OFFSET = 1000 - RADIUS;
    var centerX = Math.floor(WIDTH / 2);
    var centerY = Math.floor(HEIGHT / 2);

    var timer;
    var count = info.number;

    $(document.body).on('touchstart', '.finger', function(e){
        $(this).addClass('on');
        count--;
        check();
        e.preventDefault();
        e.stopPropagation();
    });

    $(document.body).on('touchend', '.finger', function(e){
        $(this).removeClass('on');
        count++;
        check();
        e.preventDefault();
        e.stopPropagation();
    });

    function check(){
        clearTimeout(timer);
        exports.tip(count);
        if(count === 0){
            var index = 3;
            timer = setTimeout(function(){
                $('#tip').html('倒计时 <em>' + index + '</em> 秒！');
                if(count === 0 && index === 0){
                    start();
                } else if(count === 0){
                    index--;
                    timer = setTimeout(arguments.callee, 1000);
                }
            }, 1000);
        }
    }

    function start(){
        $('#tip').html('GO!');
    }

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
        count = info.number;
        var html = '';
        var step = 2 * Math.PI / count;
        var a = WIDTH / 3.5;
        var b = HEIGHT / 3.5;
        var angle = Math.PI / 2 + Math.PI / 6 * (1 - 2 * Math.random());
        for(var i = 0; i < count; i++){
            var x = Math.floor(a * Math.cos(angle)) + centerX + OFFSET;
            var y = Math.floor(b * Math.sin(angle)) + centerY + OFFSET;
            var x2 = Math.floor(WIDTH * Math.cos(angle)) + centerX + OFFSET;
            var y2 = Math.floor(HEIGHT * Math.sin(angle)) + centerY + OFFSET;
            var deg = Math.floor( angle * 180 / Math.PI - 90 );
            var style = '-webkit-transition-delay:' + 0.5 * Math.random() + 's;';
            style += '-webkit-transform:';
            style += 'translate3d(' + x2 + 'px,' + y2 + 'px,0) ';
            style += 'rotate3d(0,0,1,' + deg + 'deg)';
            var dStyle = 'translate3d(' + x + 'px,' + y + 'px,0) ';
            dStyle += 'rotate3d(0,0,1,' + deg + 'deg)';
            html += '<div class="finger" data-style="' + dStyle + '" style="' + style + '">';
            html += '<div class="before"></div>';
            html += '<div class="after"></div>';
            html += '</div>';
            angle+= step;
        }
        fingers.html(html);
        page.show('fingers', title);
        setTimeout(function(){
            exports.showFingers();
        }, 500);
    };
});