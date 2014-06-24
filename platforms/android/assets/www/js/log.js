define('log', function(require, exports){

    var data = require('data');
    exports.play = function(id, category){
        var url = '/party/updateusetimes';
        url += '?questionId=' + (id || -1);
        url += '&questionType=' + (category || -1);
        console.log('-------------------');
        console.log(url);
        console.log('-------------------');
        url = data.getUrl(url);
        var img = new Image();
        img.src = url;
    };
});