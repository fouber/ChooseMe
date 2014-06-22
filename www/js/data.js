define('data', function (require, exports) {

    var hardcode = {
        "menu": [
            {"id": 1, "title": "真心话", "category": 3, "sub": "zxh"},
            {"id": 2, "title": "大冒险", "category": 3, "sub": "dmx"},
            {"id": 3, "title": "谁请客", "category": 3},
            {"id": 4, "title": "幸运儿", "category": 3},
            {"id": 5, "title": "倒霉蛋", "category": 3}
        ],
        "zxh": [
            {"id": 2, "title": "最喜欢在座哪位异性？", "category": 1},
            {"id": 3, "title": "内衣/裤是什么颜色？", "category": 1},
            {"id": 4, "title": "朋友和恋人哪个重要？", "category": 1},
            {"id": 5, "title": "你吻过几个人？", "category": 1},
            {"id": 6, "title": "谈过几次恋爱？", "category": 1},
            {"id": 7, "title": "你会不会在意TA的过去？", "category": 1},
            {"id": 8, "title": "说一件最糗的事？", "category": 1},
            {"id": 9, "title": "说一件最后悔的事？", "category": 1},
            {"id": 10, "title": "最讨厌在座的哪位？", "category": 1},
            {"id": 11, "title": "看过什么类型的A片？", "category": 1},
            {"id": 12, "title": "你所做过最缺德的事？", "category": 1},
            {"id": 13, "title": "想找个什么样的恋人？", "category": 1},
            {"id": 14, "title": "说三件最害怕的事情", "category": 1},
            {"id": 15, "title": "你喜欢裸睡么？", "category": 1},
            {"id": 16, "title": "如果变性一天，你想干啥？", "category": 1},
            {"id": 17, "title": "你认为在座谁最性感？", "category": 1},
            {"id": 18, "title": "第一次约会是什么时候？", "category": 1},
            {"id": 19, "title": "金钱和爱情哪个更重要？", "category": 1},
            {"id": 20, "title": "事业和爱情哪个更重要？", "category": 1},
            {"id": 21, "title": "报一下你的身高和体重", "category": 1},
            {"id": 22, "title": "评价在座每位的缺点", "category": 1}
        ],
        "dmx": [
            {"id": 3, "title": "唱青藏高原最后一句", "category": 2},
            {"id": 4, "title": "像一位异性表白3分钟", "category": 2},
            {"id": 5, "title": "横抱离你最近的异性", "category": 2},
            {"id": 6, "title": "用笔在头上画一个乌龟", "category": 2},
            {"id": 7, "title": "对陌生人喊“我是禽兽”", "category": 2},
            {"id": 8, "title": "跳钢一段管舞", "category": 2},
            {"id": 9, "title": "表演走猫步1分钟", "category": 2},
            {"id": 10, "title": "撑大鼻孔，保持10秒", "category": 2},
            {"id": 11, "title": "唱一首凤凰传奇的歌", "category": 2},
            {"id": 12, "title": "大喊：燃烧吧，小宇宙", "category": 2},
            {"id": 13, "title": "删除一个手机联系人", "category": 2},
            {"id": 14, "title": "大声朗读手机第一条短信", "category": 2},
            {"id": 15, "title": "亲左手边的人一下", "category": 2},
            {"id": 16, "title": "与右手边的人喝交杯酒", "category": 2},
            {"id": 17, "title": "舔自己的肘部", "category": 2},
            {"id": 18, "title": "右手跨过后脑勺摸左眼", "category": 2},
            {"id": 19, "title": "与左手边的人十指相扣", "category": 2},
            {"id": 20, "title": "抱起右手边的异性", "category": 2},
            {"id": 21, "title": "对陌生人美眉挤眉弄眼", "category": 2},
            {"id": 22, "title": "脱掉一件衣服", "category": 2},
            {"id": 23, "title": "分享一个小秘密", "category": 2},
            {"id": 24, "title": "请大家吃雪糕", "category": 2},
            {"id": 25, "title": "在异性身上做俯卧撑", "category": 2},
            {"id": 26, "title": "把自拍照发给女/男神", "category": 2},
            {"id": 27, "title": "坐在一个异性腿上十分钟", "category": 2},
            {"id": 28, "title": "讲一个冷笑话", "category": 2},
            {"id": 29, "title": "一口气喝完一瓶啤酒", "category": 2},
            {"id": 30, "title": "背一段广告词", "category": 2},
            {"id": 31, "title": "给一个不在场的朋友打电话表白", "category": 2},
            {"id": 32, "title": "打电话调戏10086的接线员", "category": 2},
            {"id": 33, "title": "报一下你的身高和体重", "category": 2},
            {"id": 34, "title": "给这个app五星好评", "category": 2},
            {"id": 35, "title": "给上司打电话要求加薪", "category": 2},
            {"id": 36, "title": "表演一只大猩猩2分钟", "category": 2}
        ]
    };

    var REMOTE = 'http://115.29.246.117:8981';

    exports.getUrl = function (path) {
        return REMOTE + path;
    };

    if (REMOTE) {
        var url = '/party/clientconfig';
        try {
            url += '?hashCode=' + JSON.parse(localStorage.getItem('hash'));
        } catch (e) {
        }
        url = exports.getUrl(url);
        $.getJSON(url, function (data) {
            data = data.configData || {};
            $.each(data, function (key, value) {
                value = value || hardcode[key];
                if (value) {
                    try {
                        localStorage.setItem(key, JSON.stringify(value));
                    } catch (e) {
                        //todo log error
                    }
                }
            });
        });
    }
    var runtime = {};
    exports.get = function (key, def) {
        if (runtime.hasOwnProperty(key)) {
            return runtime[key];
        } else {
            var data;
            try {
                data = localStorage.getItem(key);
                data = JSON.parse(data);
            } catch (e) {
                //todo log error
            }
            return runtime[key] = data || hardcode[key] || def;
        }
    };
});