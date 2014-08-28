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

        ships.push(new Ship("0401_0", ShipTypes.ACV, "大鳳", 1));
        ships.push(new Ship("0401_1", ShipTypes.ACV, "大鳳改", 40));

        ships.push(new Ship("0501_0", ShipTypes.CL, "鳳翔", 1));
        ships.push(new Ship("0501_1", ShipTypes.CL, "鳳翔改", 25));

        ships.push(new Ship("0502_0", ShipTypes.CL, "龍驤", 1));
        ships.push(new Ship("0502_1", ShipTypes.CL, "龍驤改", 25));
        ships.push(new Ship("0502_2", ShipTypes.CL, "龍驤改二", 75));

        ships.push(new Ship("0503_0", ShipTypes.CL, "龍鳳", 25));
        ships.push(new Ship("0503_1", ShipTypes.CL, "龍鳳改", 50));

        ships.push(new Ship("0504_0", ShipTypes.CL, "祥鳳", 1));
        ships.push(new Ship("0504_1", ShipTypes.CL, "祥鳳改", 25));

        ships.push(new Ship("0505_0", ShipTypes.CL, "瑞鳳", 1));
        ships.push(new Ship("0505_1", ShipTypes.CL, "瑞鳳改", 25));

        ships.push(new Ship("0506_0", ShipTypes.CL, "飛鷹", 1));
        ships.push(new Ship("0506_1", ShipTypes.CL, "飛鷹改", 25));

        ships.push(new Ship("0507_0", ShipTypes.CL, "隼鷹", 1));
        ships.push(new Ship("0507_1", ShipTypes.CL, "隼鷹改", 25));

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

        //ships.push(new Ship("0307_0", ShipTypes.CV, "雲龍", 1));
        //ships.push(new Ship("0307_0", ShipTypes.CV, "雲龍", 1));
        //ships.push(new Ship("0307_1", ShipTypes.CV, "雲龍改", 50));
        return ships;
    }
    ShipMaster.allShips = allShips;
})(ShipMaster || (ShipMaster = {}));
