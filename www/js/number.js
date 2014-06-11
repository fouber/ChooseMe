define('number', function(require, exports){

    var page = require('page');
    var info = require('info');
    var finger = require('finger');
    var sound = require('sound');

    $('#number').on('touchend', '.btn', function(){
        var $this = $(this);
        if(!$this.hasClass('selected')){
            $this.parent().find('.btn.selected').removeClass('selected');
            info.number = parseInt($this.text().trim());
            $this.addClass('selected');
            sound.select.play();
        }
    });

    $('#start').on('touchend', function(){
        finger.show();
        sound.start.play();
    });

    exports.show = function(title){
        page.show('number', title);
    };
});