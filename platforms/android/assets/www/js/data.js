define('data', function(require, exports){
    var hardcode = {
        menu : [
            { title: '真心话', sub: 'zxh' },
            { title: '大冒险', sub: 'dmx' },
            '谁请客',
            '幸运儿',
            '倒霉蛋'
        ],
        zxh : [
            '最喜欢在座哪位异性？',
            '内衣/裤是什么颜色？',
            '朋友和恋人哪个重要？',
            '你吻过几个人？',
            '谈过几次恋爱？',
            '你会不会在意ta的过去？',
            '说一件最糗的事？',
            '说一件最后悔的事？',
            '最讨厌在座的哪位？',
            '看过什么类型的A片？',
            '你所做过最缺德的事？',
            '想找个什么样的恋人？',
            '说三件最害怕的事情',
            '你喜欢裸睡么？',
            '你认为在座谁最性感？'
        ],
        dmx : [
            '唱青藏高原最后一句',
            '像一位异性表白3分钟',
            '横抱离你最近的异性',
            '用笔在头上画一个乌龟',
            '对陌生人喊“我是禽兽”',
            '跳钢一段管舞',
            '走猫步',
            '撑大鼻孔，保持5秒',
            '唱一首凤凰传奇的歌',
            '大喊：燃烧吧，小宇宙',
            '删除一个手机联系人',
            '亲左手边的人一下',
            '与右手边的人喝交杯酒',
            '用舌头舔肘部',
            '右手跨过后脑勺摸左眼',
            '与左手边的人十指相扣',
            '抱起右手边的异性',
            '对陌生人美眉挤眉弄眼',
            '脱掉一件衣服',
            '分享一个小秘密',
            '请大家吃雪糕',
            '在异性身上做俯卧撑'
        ]
    };
    var REMOTE = '';
    if(REMOTE){
        $.getJSON(REMOTE, function(data){
            $.each(data, function(key, value){
                value = value || hardcode[key];
                if(value){
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
    exports.get = function(key, def){
        if(runtime.hasOwnProperty(key)){
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