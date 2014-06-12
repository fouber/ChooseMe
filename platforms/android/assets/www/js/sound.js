define('sound', function(require, exports){

    $(document).on('deviceready', function(){

        var Sound = exports.Sound = function(src){
            this.audio = new Media(src);
        };
        Sound.prototype.play = function(){
            this.audio.play();
        };
        Sound.prototype.stop = function(){
            this.audio.pause();
        };

        exports.ready = new Sound('assets/ready.mp3');
        exports.win = new Sound('assets/win.mp3');
        exports.press = new Sound('assets/press.mp3');
        exports.select = new Sound('assets/select.mp3');
        exports.start = new Sound('assets/start.mp3');
        exports.back = new Sound('assets/back.mp3');

    });

});