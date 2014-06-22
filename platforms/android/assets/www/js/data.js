define('data', function (require, exports) {

    var REMOTE = 'http://115.29.246.117:8981/party/clientconfig';

    var hardcode = {
        "menu": [
            {"title": "真心话", "sub": "zxh"},
            {"title": "大冒险", "sub": "dmx"},
            {"title": "谁请客"},
            {"title": "幸运儿"},
            {"title": "倒霉蛋"}
        ],
        "zxh": [
            {"id": 2, "title": "最喜欢在座哪位异性？"},
            {"id": 3, "title": "内衣/裤是什么颜色？"},
            {"id": 4, "title": "朋友和恋人哪个重要？"},
            {"id": 5, "title": "你吻过几个人？"},
            {"id": 6, "title": "谈过几次恋爱？"},
            {"id": 7, "title": "你会不会在意TA的过去？"},
            {"id": 8, "title": "说一件最糗的事？"},
            {"id": 9, "title": "说一件最后悔的事？"},
            {"id": 10, "title": "最讨厌在座的哪位？"},
            {"id": 11, "title": "看过什么类型的A片？"},
            {"id": 12, "title": "你所做过最缺德的事？"},
            {"id": 13, "title": "想找个什么样的恋人？"},
            {"id": 14, "title": "说三件最害怕的事情"},
            {"id": 15, "title": "你喜欢裸睡么？"},
            {"id": 16, "title": "如果变性一天，你想干啥？"},
            {"id": 17, "title": "你认为在座谁最性感？"},
            {"id": 18, "title": "第一次约会是什么时候？"},
            {"id": 19, "title": "金钱和爱情哪个更重要？"},
            {"id": 20, "title": "事业和爱情哪个更重要？"},
            {"id": 21, "title": "报一下你的身高和体重"},
            {"id": 22, "title": "评价在座每位的缺点"}
        ],
        "dmx": [
            {"id": 3, "title": "唱青藏高原最后一句"},
            {"id": 4, "title": "像一位异性表白3分钟"},
            {"id": 5, "title": "横抱离你最近的异性"},
            {"id": 6, "title": "用笔在头上画一个乌龟"},
            {"id": 7, "title": "对陌生人喊“我是禽兽”"},
            {"id": 8, "title": "跳钢一段管舞"},
            {"id": 9, "title": "表演走猫步1分钟"},
            {"id": 10, "title": "撑大鼻孔，保持10秒"},
            {"id": 11, "title": "唱一首凤凰传奇的歌"},
            {"id": 12, "title": "大喊：燃烧吧，小宇宙"},
            {"id": 13, "title": "删除一个手机联系人"},
            {"id": 14, "title": "大声朗读手机第一条短信"},
            {"id": 15, "title": "亲左手边的人一下"},
            {"id": 16, "title": "与右手边的人喝交杯酒"},
            {"id": 17, "title": "舔自己的肘部"},
            {"id": 18, "title": "右手跨过后脑勺摸左眼"},
            {"id": 19, "title": "与左手边的人十指相扣"},
            {"id": 20, "title": "抱起右手边的异性"},
            {"id": 21, "title": "对陌生人美眉挤眉弄眼"},
            {"id": 22, "title": "脱掉一件衣服"},
            {"id": 23, "title": "分享一个小秘密"},
            {"id": 24, "title": "请大家吃雪糕"},
            {"id": 25, "title": "在异性身上做俯卧撑"},
            {"id": 26, "title": "把自拍照发给女/男神"},
            {"id": 27, "title": "坐在一个异性腿上十分钟"},
            {"id": 28, "title": "讲一个冷笑话"},
            {"id": 29, "title": "一口气喝完一瓶啤酒"},
            {"id": 30, "title": "背一段广告词"},
            {"id": 31, "title": "给一个不在场的朋友打电话表白"},
            {"id": 32, "title": "打电话调戏10086的接线员"},
            {"id": 33, "title": "报一下你的身高和体重"},
            {"id": 34, "title": "给这个app五星好评"},
            {"id": 35, "title": "给上司打电话要求加薪"},
            {"id": 36, "title": "表演一只大猩猩2分钟"}
        ]
    };

    if (REMOTE) {
        var url = REMOTE;
        try {
            url += '?hashCode=' + JSON.parse(localStorage.getItem('hash'));
        } catch (e) {
        }
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