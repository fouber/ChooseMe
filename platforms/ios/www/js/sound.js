define('sound', function(require, exports){

    $(document).on('deviceready', function(){

        var Sound = exports.Sound = function(src){
            if (device.platform == 'Android') {
                src = '/android_asset/www/' + src;
            }
            this.audio = new Media(src);
        };
        Sound.prototype.play = function(){
            this.audio.seekTo(0);
            this.audio.setVolume(0.5);
            this.audio.play();
        };
        Sound.prototype.stop = function(){
            this.audio.stop();
            this.audio.release();
        };

        exports.ready = new Sound('assets/ready.mp3');
        exports.win = new Sound('assets/win.mp3');
        exports.press = new Sound('assets/press.mp3');
        exports.select = new Sound('assets/select.mp3');
        exports.start = new Sound('assets/start.mp3');
        exports.back = new Sound('assets/back.mp3');
        exports.change = new Sound('assets/change.mp3');

    });

});