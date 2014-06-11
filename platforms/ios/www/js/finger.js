define('finger', function(require, exports){

    var page = require('page');
    var info = require('info');
    var sound = require('sound');

    var WIDTH = document.body.clientWidth;
    var HEIGHT = document.body.clientHeight - 100;
    var RADIUS = 45;
    var OFFSET = 1000 - RADIUS;
    var centerX = Math.floor(WIDTH / 2);
    var centerY = Math.floor(HEIGHT / 2);

    var timer;
    var count = info.number;
    var angles = [];

    $(document.body).on('touchstart', '.finger', function(e){
        if(info.choosing) return;
        sound.ready.stop();
        $(this).addClass('on');
        count--;
        check();
        e.preventDefault();
        e.stopPropagation();
    });

    $(document.body).on('touchend', '.finger', function(e){
        if(info.choosing) return;
        sound.ready.stop();
        $(this).removeClass('on');
        count++;
        check();
        e.preventDefault();
        e.stopPropagation();
    });

    function finish(index){
        sound.win.play();
        $('.finger').each(function(i){
            var $this = $(this);
            if(index !== i){
                $this.css('opacity', '0');
            } else {
                $this.addClass('lucky');
            }
        });
        info.canGoHome = true;
    }

    function check(){
        info.canGoHome = count === info.number;
        clearTimeout(timer);
        exports.tip(count);
        if(count === 0){
            var index = 2;
            timer = setTimeout(function(){
                if(index === 2){
                    $('#tip').html('<em>Ready?</em>');
                    sound.ready.play();
                } else {
                    $('#tip').html('<em>Go!</em>');
                }
                if(count === 0 && index === 0){
                    start();
                } else if(count === 0){
                    index--;
                    timer = setTimeout(arguments.callee, 800);
                }
            }, 800);
        }
    }

    function start(){
        info.choosing = true;
        var $tip = $('#tip');
        $tip.html('');
        var arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.style.left = centerX + 'px';
        arrow.style.top = 0 + 'px';
        $tip.append(arrow);
        var index = Math.floor(Math.random() * angles.length);
        var target = Math.PI * 10 + angles[index] + Math.PI / 2;
        var angle = 0, speed = 30;
        var timer = setInterval(function(){
            if(Math.abs(target - angle) < 0.3){
                angle = target;
                clearInterval(timer);
                finish(index);
            } else {
                angle += (target - angle) / speed;
            }
            arrow.style.webkitTransform = 'rotate3d(0,0,1,' + (angle * 180 / Math.PI) + 'deg)';
        }, 20);
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
        var fingers = $('#fingers').html('');
        this.tip(info.number);
        count = info.number;
        angles = [];
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
            angles.push(angle);
            angle+= step;
        }
        fingers.html(html);
        page.show('fingers', title);
        setTimeout(function(){
            exports.showFingers();
        }, 500);
    };
});