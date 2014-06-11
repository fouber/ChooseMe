define('sound', function(require, exports){

    var Sound = exports.Sound = function(src){
        var audio = this.audio = new Audio(src);
        audio.autoplay = false;
        audio.preload = 'auto';
        audio.loop = false;
        audio.load();
    };
    Sound.prototype.play = function(){
        this.stop();
        this.audio.play();
    };
    Sound.prototype.stop = function(){
        this.audio.pause();
        this.audio.currentTime = 0.0;
    };

    exports.ready = new Sound('assets/ready.mp3');
    exports.win = new Sound('assets/win.mp3');
    exports.press = new Sound('assets/press.mp3');
    exports.select = new Sound('assets/select.mp3');
    exports.start = new Sound('assets/start.mp3');
    exports.back = new Sound('assets/back.mp3');

});