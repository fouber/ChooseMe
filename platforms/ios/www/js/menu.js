define('menu', function (require, exports) {

    var data = require('data');
    var info = require('info');
    var number = require('number');
    var page = require('page');
    var sound = require('sound');
    var touchmoved = false;
    var currentSub;

    function back(){
        page.home();
        sound.back.play();
    }

    $('#home').on('touchend', back);
    $(document).on('backbutton', back);
    $(document.body).on('touchstart', function () {
        touchmoved = false;
    });
    $(document.body).on('touchmove', function () {
        touchmoved = true;
    });

    var shakeTimer;
    $('#sub-change').on('touchend', function(){
        if(currentSub) {
            clearTimeout(shakeTimer);
            shakeTimer = setTimeout(function(){
                $('#sub-menu').removeClass('shake');
            }, 800);
            exports.render('#sub-menu', getItems(currentSub));
            $('#sub-menu').addClass('shake');
            sound.change.play();
        }
    });

    var items = {
        src: {},
        use: {}
    };
    var ITEM_SIZE = Math.floor((document.body.clientHeight - 200) / 70);

    var watchID, shakeCount = 0, timer;

    function startWatch() {
        stopWatch();
        if(navigator.accelerometer && navigator.accelerometer.watchAcceleration){
            var options = { frequency: 350 };
            watchID = navigator.accelerometer.watchAcceleration(onWatchSuccess, onWatchError, options);
        }
    }

    function stopWatch(){
        if (watchID && navigator.accelerometer && navigator.accelerometer.clearWatch) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    function onWatchSuccess(acceleration) {
        if (
            Math.abs(acceleration.x) > 11 ||
            Math.abs(acceleration.y) > 11 ||
            Math.abs(acceleration.z) > 11
        ) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                shakeCount = 0;
                $('#sub-menu').removeClass('shake');
            }, 1500);
            if(++shakeCount > 1){
                $('#sub-menu').addClass('shake');
                exports.render('#sub-menu', getItems(currentSub));
                shakeCount = 0;
                navigator.notification.vibrate(300);
                sound.change.play();
            }
        }
    }

    function onWatchError(){}

    page.on('after_show', function(e){
        if(e.data.current === 'sub'){
            startWatch();
        } else {
            stopWatch();
        }
    });

    function getItems(key) {
        if (!items.src.hasOwnProperty(key)) {
            items.src[key] = [];
            items.use[key] = data.get(key, []);
        }
        if (items.src[key].length < ITEM_SIZE) {
            items.src[key] = items.use[key].concat(items.src[key]).sort(function () {
                return Math.random() > 0.5 ? 1 : -1;
            });
            items.use[key] = [];
        }
        var list = items.src[key].splice(0, ITEM_SIZE);
        items.use[key] = items.use[key].concat(list);
        return list;
    }

    $(document.body).on('touchend', '.btn[data-choose]', function () {
        if (!touchmoved) {
            sound.press.play();
            var $this = $(this);
            var sub = $this.data('sub');
            var text = $this.text();
            if (sub) {
                currentSub = sub;
                exports.render('#sub-menu', getItems(sub));
                page.show('sub', text);
            } else {
                number.show(info.text = text);
            }
        }
        touchmoved = false;
    });

    exports.render = function (selector, key) {
        var html = '';
        var items = [];
        if (typeof key === 'string') {
            items = data.get(key, []);
        } else if (key instanceof Array) {
            items = key;
        }
        $.each(items, function (index, item) {
            if (typeof item === 'string') {
                item = { title: item };
            }
            var size = Math.floor(220 / item.title.length);
            size = Math.max(12, Math.min(20, size));
            html += '<a href="javascript:void(0)" data-choose' +
                (item.sub ? ' data-sub="' + item.sub + '"' : '') +
                (item.id ? ' data-id="' + item.id + '"' : '') +
                ' style="font-size:' + size + 'px"' +
                ' class="btn" >' + item.title + '</a>';
        });
        $(selector).html(html);
    };
});