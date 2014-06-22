define('log', function(require, exports){

    var data = require('data');
    var TYPES  = {
        zxh : 1,
        dmx : 2,
        menu: 3
    };
    exports.play = function(id, type){
        var url = '/party/updateusetimes';
        url += '?questionId=' + id;
        url += '&questionType=' + (TYPES[type] || -1);
        url = data.getUrl(url);
        console.log('-----------------');
        console.log(url);
        console.log('-----------------');
        var img = new Image();
        img.src = url;
    };
});