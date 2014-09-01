var Ship = (function () {
    function Ship(shipId, type, name, level) {
        this.shipId = shipId;
        this.type = type;
        this.name = name;
        this.level = level;
    }
    return Ship;
})();

var ShipMaster;
(function (ShipMaster) {
    function allShips() {
        var ships = [];

        ships.push(new Ship("0101_0", ShipTypes.BB, "金剛", 1));
        ships.push(new Ship("0101_1", ShipTypes.BB, "金剛改", 25));
        ships.push(new Ship("0101_2", ShipTypes.BB, "金剛改二", 75));

        ships.push(new Ship("0102_0", ShipTypes.BB, "比叡", 1));
        ships.push(new Ship("0102_1", ShipTypes.BB, "比叡", 25));
        ships.push(new Ship("0102_2", ShipTypes.BB, "比叡改二", 75));

        ships.push(new Ship("0103_0", ShipTypes.BB, "榛名", 1));
        ships.push(new Ship("0103_1", ShipTypes.BB, "榛名改", 25));
        ships.push(new Ship("0103_2", ShipTypes.BB, "榛名改二", 80));

        ships.push(new Ship("0104_0", ShipTypes.BB, "霧島", 1));
        ships.push(new Ship("0104_1", ShipTypes.BB, "霧島改", 25));
        ships.push(new Ship("0104_2", ShipTypes.BB, "霧島改二", 75));

        ships.push(new Ship("0105_0", ShipTypes.BB, "扶桑", 1));
        ships.push(new Ship("0105_1", ShipTypes.BBV, "扶桑改", 20));

        ships.push(new Ship("0106_0", ShipTypes.BB, "山城", 1));
        ships.push(new Ship("0106_1", ShipTypes.BBV, "山城改", 20));

        ships.push(new Ship("0107_0", ShipTypes.BB, "伊勢", 1));
        ships.push(new Ship("0107_1", ShipTypes.BBV, "伊勢改", 10));

        ships.push(new Ship("0108_0", ShipTypes.BB, "日向", 1));
        ships.push(new Ship("0108_1", ShipTypes.BBV, "日向改", 10));

        ships.push(new Ship("0109_0", ShipTypes.BB, "長門", 1));
        ships.push(new Ship("0109_1", ShipTypes.BB, "長門改", 30));

        ships.push(new Ship("0110_0", ShipTypes.BB, "陸奥", 1));
        ships.push(new Ship("0110_1", ShipTypes.BB, "陸奥改", 30));

        ships.push(new Ship("0111_0", ShipTypes.BB, "大和", 1));
        ships.push(new Ship("0111_1", ShipTypes.BB, "大和改", 60));

        ships.push(new Ship("0112_0", ShipTypes.BB, "武蔵", 1));
        ships.push(new Ship("0112_1", ShipTypes.BB, "武蔵改", 40));

        ships.push(new Ship("0113_0", ShipTypes.BB, "Bismarck", 1));
        ships.push(new Ship("0113_1", ShipTypes.BB, "Bismarck改", 30));
        ships.push(new Ship("0113_2", ShipTypes.BB, "Bismarck zwei", 50));

        ships.push(new Ship("0301_0", ShipTypes.CV, "赤城", 1));
        ships.push(new Ship("0301_1", ShipTypes.CV, "赤城改", 30));

        ships.push(new Ship("0302_0", ShipTypes.CV, "加賀", 1));
        ships.push(new Ship("0302_1", ShipTypes.CV, "加賀改", 30));

        ships.push(new Ship("0303_0", ShipTypes.CV, "蒼龍", 1));
        ships.push(new Ship("0303_1", ShipTypes.CV, "蒼龍改", 30));
        ships.push(new Ship("0303_2", ShipTypes.CV, "蒼龍改二", 78));

        ships.push(new Ship("0304_0", ShipTypes.CV, "飛龍", 1));
        ships.push(new Ship("0304_1", ShipTypes.CV, "飛龍改", 30));
        ships.push(new Ship("0304_2", ShipTypes.CV, "飛龍改二", 77));

        ships.push(new Ship("0305_0", ShipTypes.CV, "翔鶴", 1));
        ships.push(new Ship("0305_1", ShipTypes.CV, "翔鶴改", 30));

        ships.push(new Ship("0306_0", ShipTypes.CV, "瑞鶴", 1));
        ships.push(new Ship("0306_1", ShipTypes.CV, "瑞鶴改", 25));

        ships.push(new Ship("0307_0", ShipTypes.CV, "雲龍", 1));
        ships.push(new Ship("0307_1", ShipTypes.CV, "雲龍改", 50));

        ships.push(new Ship("0401_0", ShipTypes.ACV, "大鳳", 1));
        ships.push(new Ship("0401_1", ShipTypes.ACV, "大鳳改", 40));

        ships.push(new Ship("0501_0", ShipTypes.CVL, "鳳翔", 1));
        ships.push(new Ship("0501_1", ShipTypes.CVL, "鳳翔改", 25));

        ships.push(new Ship("0502_0", ShipTypes.CVL, "龍驤", 1));
        ships.push(new Ship("0502_1", ShipTypes.CVL, "龍驤改", 25));
        ships.push(new Ship("0502_2", ShipTypes.CVL, "龍驤改二", 75));

        ships.push(new Ship("0503_0", ShipTypes.CVL, "龍鳳", 25));
        ships.push(new Ship("0503_1", ShipTypes.CVL, "龍鳳改", 50));

        ships.push(new Ship("0504_0", ShipTypes.CVL, "祥鳳", 1));
        ships.push(new Ship("0504_1", ShipTypes.CVL, "祥鳳改", 25));

        ships.push(new Ship("0505_0", ShipTypes.CVL, "瑞鳳", 1));
        ships.push(new Ship("0505_1", ShipTypes.CVL, "瑞鳳改", 25));

        ships.push(new Ship("0506_0", ShipTypes.CVL, "飛鷹", 1));
        ships.push(new Ship("0506_1", ShipTypes.CVL, "飛鷹改", 25));

        ships.push(new Ship("0507_0", ShipTypes.CVL, "隼鷹", 1));
        ships.push(new Ship("0507_1", ShipTypes.CVL, "隼鷹改", 25));
        ships.push(new Ship("0507_2", ShipTypes.CVL, "隼鷹改二", 80));

        ships.push(new Ship("0601_0", ShipTypes.AV, "千歳", 1));
        ships.push(new Ship("0601_1", ShipTypes.AV, "千歳改", 10));
        ships.push(new Ship("0601_2", ShipTypes.AV, "千歳甲", 12));
        ships.push(new Ship("0601_3", ShipTypes.AV, "千歳航", 15));
        ships.push(new Ship("0601_4", ShipTypes.AV, "千歳航改", 35));
        ships.push(new Ship("0601_5", ShipTypes.AV, "千歳航改二", 50));

        ships.push(new Ship("0602_0", ShipTypes.AV, "千代田", 1));
        ships.push(new Ship("0602_1", ShipTypes.AV, "千代田改", 10));
        ships.push(new Ship("0602_2", ShipTypes.AV, "千代田甲", 12));
        ships.push(new Ship("0602_3", ShipTypes.AV, "千代田航", 15));
        ships.push(new Ship("0602_4", ShipTypes.AV, "千代田航改", 35));
        ships.push(new Ship("0602_5", ShipTypes.AV, "千代田航改二", 50));

        ships.push(new Ship("0701_0", ShipTypes.CA, "古鷹", 1));
        ships.push(new Ship("0701_1", ShipTypes.CA, "古鷹", 25));

        ships.push(new Ship("0702_0", ShipTypes.CA, "加古", 1));
        ships.push(new Ship("0702_1", ShipTypes.CA, "加古改", 25));

        ships.push(new Ship("0703_0", ShipTypes.CA, "青葉", 1));
        ships.push(new Ship("0703_1", ShipTypes.CA, "青葉改", 25));

        ships.push(new Ship("0704_0", ShipTypes.CA, "衣笠", 1));
        ships.push(new Ship("0704_1", ShipTypes.CA, "衣笠改", 25));
        ships.push(new Ship("0704_2", ShipTypes.CA, "衣笠改二", 55));

        ships.push(new Ship("0705_0", ShipTypes.CA, "妙高", 1));
        ships.push(new Ship("0705_1", ShipTypes.CA, "妙高改", 25));
        ships.push(new Ship("0705_2", ShipTypes.CA, "妙高改二", 70));

        ships.push(new Ship("0706_0", ShipTypes.CA, "那智", 1));
        ships.push(new Ship("0706_1", ShipTypes.CA, "那智改", 25));

        ships.push(new Ship("0707_0", ShipTypes.CA, "足柄", 1));
        ships.push(new Ship("0707_1", ShipTypes.CA, "足柄改", 25));

        ships.push(new Ship("0708_0", ShipTypes.CA, "羽黒", 1));
        ships.push(new Ship("0708_1", ShipTypes.CA, "羽黒改", 25));
        ships.push(new Ship("0708_2", ShipTypes.CA, "羽黒改二", 65));

        ships.push(new Ship("0709_0", ShipTypes.CA, "高雄", 1));
        ships.push(new Ship("0709_1", ShipTypes.CA, "高雄改", 25));

        ships.push(new Ship("0710_0", ShipTypes.CA, "愛宕", 1));
        ships.push(new Ship("0710_1", ShipTypes.CA, "愛宕改", 25));

        ships.push(new Ship("0711_0", ShipTypes.CA, "摩耶", 1));
        ships.push(new Ship("0711_1", ShipTypes.CA, "摩耶改", 18));

        ships.push(new Ship("0712_0", ShipTypes.CA, "鳥海", 1));
        ships.push(new Ship("0712_1", ShipTypes.CA, "鳥海改", 25));

        ships.push(new Ship("0713_0", ShipTypes.CA, "最上", 1));
        ships.push(new Ship("0713_1", ShipTypes.CAV, "最上改", 10));

        ships.push(new Ship("0714_0", ShipTypes.CA, "三隈", 1));
        ships.push(new Ship("0714_1", ShipTypes.CAV, "三隈改", 30));

        ships.push(new Ship("0715_0", ShipTypes.CA, "鈴谷", 1));
        ships.push(new Ship("0715_1", ShipTypes.CAV, "鈴谷改", 35));

        ships.push(new Ship("0716_0", ShipTypes.CA, "熊野", 1));
        ships.push(new Ship("0716_1", ShipTypes.CAV, "熊野改", 35));

        ships.push(new Ship("0717_0", ShipTypes.CA, "利根", 1));
        ships.push(new Ship("0717_1", ShipTypes.CA, "利根改", 25));
        ships.push(new Ship("0717_2", ShipTypes.CAV, "利根改二", 70));

        ships.push(new Ship("0718_0", ShipTypes.CA, "筑摩", 1));
        ships.push(new Ship("0718_1", ShipTypes.CA, "筑摩改", 25));
        ships.push(new Ship("0718_2", ShipTypes.CAV, "筑摩改二", 70));

        ships.push(new Ship("0801_0", ShipTypes.CL, "天龍", 1));
        ships.push(new Ship("0801_1", ShipTypes.CL, "天龍改", 20));

        ships.push(new Ship("0802_0", ShipTypes.CL, "龍田", 1));
        ships.push(new Ship("0802_1", ShipTypes.CL, "龍田改", 20));

        ships.push(new Ship("0803_0", ShipTypes.CL, "球磨", 1));
        ships.push(new Ship("0803_1", ShipTypes.CL, "球磨改", 20));

        ships.push(new Ship("0804_0", ShipTypes.CL, "多摩", 1));
        ships.push(new Ship("0804_1", ShipTypes.CL, "多摩改", 20));

        ships.push(new Ship("0805_0", ShipTypes.CL, "北上", 1));
        ships.push(new Ship("0805_1", ShipTypes.CLT, "北上改", 10));
        ships.push(new Ship("0805_2", ShipTypes.CLT, "北上改二", 50));

        ships.push(new Ship("0806_0", ShipTypes.CL, "大井", 1));
        ships.push(new Ship("0806_1", ShipTypes.CLT, "大井改", 10));
        ships.push(new Ship("0806_2", ShipTypes.CLT, "大井改二", 50));

        ships.push(new Ship("0807_0", ShipTypes.CL, "木曾", 1));
        ships.push(new Ship("0807_1", ShipTypes.CL, "木曾改", 20));
        ships.push(new Ship("0807_2", ShipTypes.CLT, "木曾改二", 65));

        ships.push(new Ship("0808_0", ShipTypes.CL, "長良", 1));
        ships.push(new Ship("0808_1", ShipTypes.CL, "長良改", 20));

        ships.push(new Ship("0809_0", ShipTypes.CL, "五十鈴", 1));
        ships.push(new Ship("0809_1", ShipTypes.CL, "五十鈴改", 12));
        ships.push(new Ship("0809_2", ShipTypes.CL, "五十鈴改二", 50));

        ships.push(new Ship("0810_0", ShipTypes.CL, "名取", 1));
        ships.push(new Ship("0810_1", ShipTypes.CL, "名取改", 20));

        ships.push(new Ship("0811_0", ShipTypes.CL, "由良", 1));
        ships.push(new Ship("0811_1", ShipTypes.CL, "由良改", 20));

        ships.push(new Ship("0812_0", ShipTypes.CL, "鬼怒", 1));
        ships.push(new Ship("0812_1", ShipTypes.CL, "鬼怒改", 17));

        ships.push(new Ship("0813_0", ShipTypes.CL, "阿武隈", 1));
        ships.push(new Ship("0813_1", ShipTypes.CL, "阿武隈改", 20));

        ships.push(new Ship("0814_0", ShipTypes.CL, "川内", 1));
        ships.push(new Ship("0814_1", ShipTypes.CL, "川内改", 20));
        ships.push(new Ship("0814_2", ShipTypes.CL, "川内改二", 60));

        ships.push(new Ship("0815_0", ShipTypes.CL, "神通", 1));
        ships.push(new Ship("0815_1", ShipTypes.CL, "神通改", 20));
        ships.push(new Ship("0815_2", ShipTypes.CL, "神通改二", 60));

        ships.push(new Ship("0816_0", ShipTypes.CL, "那珂", 1));
        ships.push(new Ship("0816_1", ShipTypes.CL, "那珂改", 20));
        ships.push(new Ship("0816_2", ShipTypes.CL, "那珂改二", 48));

        ships.push(new Ship("0817_0", ShipTypes.CL, "夕張", 1));
        ships.push(new Ship("0817_1", ShipTypes.CL, "夕張改", 25));

        ships.push(new Ship("0818_0", ShipTypes.CL, "阿賀野", 1));
        ships.push(new Ship("0818_1", ShipTypes.CL, "阿賀野改", 35));

        ships.push(new Ship("0819_0", ShipTypes.CL, "能代", 1));
        ships.push(new Ship("0819_1", ShipTypes.CL, "能代改", 35));

        ships.push(new Ship("0820_0", ShipTypes.CL, "矢矧", 1));
        ships.push(new Ship("0820_1", ShipTypes.CL, "矢矧改", 35));

        ships.push(new Ship("0821_0", ShipTypes.CL, "酒匂", 1));
        ships.push(new Ship("0821_1", ShipTypes.CL, "酒匂改", 35));

        ships.push(new Ship("0822_0", ShipTypes.CL, "大淀", 1));
        ships.push(new Ship("0822_1", ShipTypes.CL, "大淀改", 35));

        ships.push(new Ship("0901_0", ShipTypes.DD, "雪風", 1));
        ships.push(new Ship("0901_1", ShipTypes.DD, "雪風改", 20));

        ships.push(new Ship("0902_0", ShipTypes.DD, "島風", 1));
        ships.push(new Ship("0902_1", ShipTypes.DD, "島風改", 20));

        ships.push(new Ship("0903_0", ShipTypes.DD, "吹雪", 1));
        ships.push(new Ship("0903_1", ShipTypes.DD, "吹雪改", 20));

        ships.push(new Ship("0904_0", ShipTypes.DD, "白雪", 1));
        ships.push(new Ship("0904_1", ShipTypes.DD, "白雪改", 20));

        ships.push(new Ship("0905_0", ShipTypes.DD, "初雪", 1));
        ships.push(new Ship("0905_1", ShipTypes.DD, "初雪改", 20));

        ships.push(new Ship("0906_0", ShipTypes.DD, "深雪", 1));
        ships.push(new Ship("0906_1", ShipTypes.DD, "深雪改", 20));

        ships.push(new Ship("0907_0", ShipTypes.DD, "叢雲", 1));
        ships.push(new Ship("0907_1", ShipTypes.DD, "叢雲改", 20));

        ships.push(new Ship("0908_0", ShipTypes.DD, "磯波", 1));
        ships.push(new Ship("0908_1", ShipTypes.DD, "磯波改", 20));

        ships.push(new Ship("0909_0", ShipTypes.DD, "綾波", 1));
        ships.push(new Ship("0909_1", ShipTypes.DD, "綾波改", 20));
        ships.push(new Ship("0909_2", ShipTypes.DD, "綾波改二", 70));

        ships.push(new Ship("0910_0", ShipTypes.DD, "敷波", 1));
        ships.push(new Ship("0910_1", ShipTypes.DD, "敷波改", 20));

        ships.push(new Ship("0911_0", ShipTypes.DD, "睦月", 1));
        ships.push(new Ship("0911_1", ShipTypes.DD, "睦月改", 20));

        ships.push(new Ship("0912_0", ShipTypes.DD, "如月", 1));
        ships.push(new Ship("0912_1", ShipTypes.DD, "如月改", 20));

        ships.push(new Ship("0913_0", ShipTypes.DD, "皐月", 1));
        ships.push(new Ship("0913_1", ShipTypes.DD, "皐月改", 20));

        ships.push(new Ship("0914_0", ShipTypes.DD, "文月", 1));
        ships.push(new Ship("0914_1", ShipTypes.DD, "文月改", 20));

        ships.push(new Ship("0915_0", ShipTypes.DD, "長月", 1));
        ships.push(new Ship("0915_1", ShipTypes.DD, "長月改", 20));

        ships.push(new Ship("0916_0", ShipTypes.DD, "菊月", 1));
        ships.push(new Ship("0916_1", ShipTypes.DD, "菊月改", 20));

        ships.push(new Ship("0917_0", ShipTypes.DD, "三日月", 1));
        ships.push(new Ship("0917_1", ShipTypes.DD, "三日月改", 20));

        ships.push(new Ship("0918_0", ShipTypes.DD, "望月", 1));
        ships.push(new Ship("0918_1", ShipTypes.DD, "望月改", 20));

        ships.push(new Ship("0919_0", ShipTypes.DD, "朧", 1));
        ships.push(new Ship("0919_1", ShipTypes.DD, "朧改", 20));

        ships.push(new Ship("0920_0", ShipTypes.DD, "曙", 1));
        ships.push(new Ship("0920_1", ShipTypes.DD, "曙改", 20));

        ships.push(new Ship("0921_0", ShipTypes.DD, "漣", 1));
        ships.push(new Ship("0921_1", ShipTypes.DD, "漣改", 20));

        ships.push(new Ship("0922_0", ShipTypes.DD, "潮", 1));
        ships.push(new Ship("0922_1", ShipTypes.DD, "潮改", 20));

        ships.push(new Ship("0923_0", ShipTypes.DD, "暁", 1));
        ships.push(new Ship("0923_1", ShipTypes.DD, "暁改", 20));

        ships.push(new Ship("0924_0", ShipTypes.DD, "響", 1));
        ships.push(new Ship("0924_1", ShipTypes.DD, "響改", 20));
        ships.push(new Ship("0924_2", ShipTypes.DD, "Верный", 70));

        ships.push(new Ship("0925_0", ShipTypes.DD, "雷", 1));
        ships.push(new Ship("0925_1", ShipTypes.DD, "雷改", 20));

        ships.push(new Ship("0926_0", ShipTypes.DD, "電", 1));
        ships.push(new Ship("0926_1", ShipTypes.DD, "電改", 20));

        ships.push(new Ship("0927_0", ShipTypes.DD, "初春", 1));
        ships.push(new Ship("0927_1", ShipTypes.DD, "初春改", 20));

        ships.push(new Ship("0928_0", ShipTypes.DD, "子日", 1));
        ships.push(new Ship("0928_1", ShipTypes.DD, "子日改", 20));

        ships.push(new Ship("0929_0", ShipTypes.DD, "若葉", 1));
        ships.push(new Ship("0929_1", ShipTypes.DD, "若葉改", 20));

        ships.push(new Ship("0930_0", ShipTypes.DD, "初霜", 1));
        ships.push(new Ship("0930_1", ShipTypes.DD, "初霜改", 20));

        ships.push(new Ship("0931_0", ShipTypes.DD, "白露", 1));
        ships.push(new Ship("0931_1", ShipTypes.DD, "白露改", 20));

        ships.push(new Ship("0932_0", ShipTypes.DD, "時雨", 1));
        ships.push(new Ship("0932_1", ShipTypes.DD, "時雨改", 20));
        ships.push(new Ship("0932_2", ShipTypes.DD, "時雨改二", 60));

        ships.push(new Ship("0933_0", ShipTypes.DD, "村雨", 1));
        ships.push(new Ship("0933_1", ShipTypes.DD, "村雨改", 20));

        ships.push(new Ship("0934_0", ShipTypes.DD, "夕立", 1));
        ships.push(new Ship("0934_1", ShipTypes.DD, "夕立改", 20));
        ships.push(new Ship("0934_2", ShipTypes.DD, "夕立改二", 55));

        ships.push(new Ship("0935_0", ShipTypes.DD, "五月雨", 1));
        ships.push(new Ship("0935_1", ShipTypes.DD, "五月雨改", 20));

        ships.push(new Ship("0936_0", ShipTypes.DD, "涼風", 1));
        ships.push(new Ship("0936_1", ShipTypes.DD, "涼風改", 20));

        ships.push(new Ship("0937_0", ShipTypes.DD, "朝潮", 1));
        ships.push(new Ship("0937_1", ShipTypes.DD, "朝潮改", 20));

        ships.push(new Ship("0938_0", ShipTypes.DD, "大潮", 1));
        ships.push(new Ship("0938_1", ShipTypes.DD, "大潮改", 20));

        ships.push(new Ship("0939_0", ShipTypes.DD, "満潮", 1));
        ships.push(new Ship("0939_1", ShipTypes.DD, "満潮改", 20));

        ships.push(new Ship("0940_0", ShipTypes.DD, "荒潮", 1));
        ships.push(new Ship("0940_1", ShipTypes.DD, "荒潮改", 20));

        ships.push(new Ship("0941_0", ShipTypes.DD, "霰", 1));
        ships.push(new Ship("0941_1", ShipTypes.DD, "霰改", 20));

        ships.push(new Ship("0942_0", ShipTypes.DD, "霞", 1));
        ships.push(new Ship("0942_1", ShipTypes.DD, "霞改", 20));

        ships.push(new Ship("0943_0", ShipTypes.DD, "陽炎", 1));
        ships.push(new Ship("0943_1", ShipTypes.DD, "陽炎改", 20));

        ships.push(new Ship("0944_0", ShipTypes.DD, "不知火", 1));
        ships.push(new Ship("0944_1", ShipTypes.DD, "不知火改", 20));

        ships.push(new Ship("0945_0", ShipTypes.DD, "黒潮", 1));
        ships.push(new Ship("0945_1", ShipTypes.DD, "黒潮改", 20));

        ships.push(new Ship("0946_0", ShipTypes.DD, "初風", 1));
        ships.push(new Ship("0946_1", ShipTypes.DD, "初風改", 20));

        ships.push(new Ship("0947_0", ShipTypes.DD, "舞風", 1));
        ships.push(new Ship("0947_1", ShipTypes.DD, "舞風改", 20));

        ships.push(new Ship("0948_0", ShipTypes.DD, "秋雲", 1));
        ships.push(new Ship("0948_1", ShipTypes.DD, "秋雲改", 30));

        ships.push(new Ship("0949_0", ShipTypes.DD, "夕雲", 1));
        ships.push(new Ship("0949_1", ShipTypes.DD, "夕雲改", 30));

        ships.push(new Ship("0950_0", ShipTypes.DD, "巻雲", 1));
        ships.push(new Ship("0950_1", ShipTypes.DD, "巻雲改", 30));

        ships.push(new Ship("0951_0", ShipTypes.DD, "長波", 1));
        ships.push(new Ship("0951_1", ShipTypes.DD, "長波改", 30));

        ships.push(new Ship("0952_0", ShipTypes.DD, "弥生", 1));
        ships.push(new Ship("0952_1", ShipTypes.DD, "弥生改", 20));

        ships.push(new Ship("0953_0", ShipTypes.DD, "卯月", 1));
        ships.push(new Ship("0953_1", ShipTypes.DD, "卯月改", 25));

        ships.push(new Ship("0954_0", ShipTypes.DD, "磯風", 1));
        ships.push(new Ship("0954_1", ShipTypes.DD, "磯風改", 45));

        ships.push(new Ship("0955_0", ShipTypes.DD, "浦風", 1));
        ships.push(new Ship("0955_1", ShipTypes.DD, "浦風改", 35));

        ships.push(new Ship("0956_0", ShipTypes.DD, "谷風", 1));
        ships.push(new Ship("0956_1", ShipTypes.DD, "谷風改", 30));

        ships.push(new Ship("0957_0", ShipTypes.DD, "浜風", 1));
        ships.push(new Ship("0957_1", ShipTypes.DD, "浜風改", 30));

        ships.push(new Ship("0958_0", ShipTypes.DD, "Z1", 1));
        ships.push(new Ship("0958_1", ShipTypes.DD, "Z1改", 30));
        ships.push(new Ship("0958_2", ShipTypes.DD, "Z1 zwei", 70));

        ships.push(new Ship("0959_0", ShipTypes.DD, "Z3", 1));
        ships.push(new Ship("0959_1", ShipTypes.DD, "Z3改", 30));
        ships.push(new Ship("0959_2", ShipTypes.DD, "Z3 zwei", 70));

        ships.push(new Ship("0960_0", ShipTypes.DD, "天津風", 1));
        ships.push(new Ship("0960_1", ShipTypes.DD, "天津風改", 20));

        ships.push(new Ship("0961_0", ShipTypes.DD, "時津風", 1));
        ships.push(new Ship("0961_1", ShipTypes.DD, "時津風改", 30));

        ships.push(new Ship("0962_0", ShipTypes.DD, "春雨", 1));
        ships.push(new Ship("0962_1", ShipTypes.DD, "春雨改", 30));

        ships.push(new Ship("0963_0", ShipTypes.DD, "早霜", 1));
        ships.push(new Ship("0963_1", ShipTypes.DD, "早霜改", 30));

        ships.push(new Ship("0964_0", ShipTypes.DD, "清霜", 1));
        ships.push(new Ship("0964_1", ShipTypes.DD, "清霜改", 30));

        ships.push(new Ship("1101_0", ShipTypes.SS, "伊168", 1));
        ships.push(new Ship("1101_1", ShipTypes.SS, "伊168改", 50));

        ships.push(new Ship("1102_0", ShipTypes.SS, "伊58", 1));
        ships.push(new Ship("1102_1", ShipTypes.SSV, "伊58改", 50));

        ships.push(new Ship("1103_0", ShipTypes.SS, "伊19", 1));
        ships.push(new Ship("1103_1", ShipTypes.SSV, "伊19改", 50));

        ships.push(new Ship("1104_0", ShipTypes.SS, "伊8", 1));
        ships.push(new Ship("1104_1", ShipTypes.SSV, "伊8改", 50));

        ships.push(new Ship("1105_0", ShipTypes.SSV, "伊401", 1));
        ships.push(new Ship("1105_1", ShipTypes.SSV, "伊401改", 35));

        ships.push(new Ship("1106_0", ShipTypes.SS, "まるゆ", 1));
        ships.push(new Ship("1106_1", ShipTypes.SS, "まるゆ", 20));

        ships.push(new Ship("1201_0", ShipTypes.LHA, "あきつ丸", 1));
        ships.push(new Ship("1201_1", ShipTypes.LHA, "あきつ丸改", 25));

        ships.push(new Ship("1301_0", ShipTypes.AR, "明石", 1));
        ships.push(new Ship("1301_1", ShipTypes.AR, "明石改", 35));

        ships.push(new Ship("1401_0", ShipTypes.AS, "大鯨", 1));
        ships.push(new Ship("1401_1", ShipTypes.CVL, "龍鳳", 25));
        ships.push(new Ship("1401_2", ShipTypes.CVL, "龍鳳改", 50));

        return ships;
    }
    ShipMaster.allShips = allShips;
})(ShipMaster || (ShipMaster = {}));
