/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
var ShipTypeMaster;
(function (ShipTypeMaster) {
    ShipTypeMaster.list;

    ShipTypeMaster.map;

    function initialize() {
        var selectedDefault = true;

        return jQuery.Deferred(function (dfd) {
            ShipTypeMaster.list = [
                new ShipType(ShipTypes.BB, "戦艦", "戦"),
                new ShipType(ShipTypes.BBV, "航空戦艦", "航戦"),
                new ShipType(ShipTypes.CV, "正規空母", "航"),
                new ShipType(ShipTypes.ACV, "装甲空母", "装母"),
                new ShipType(ShipTypes.CVL, "軽空母", "軽母"),
                new ShipType(ShipTypes.AV, "水上機母艦", "水母"),
                new ShipType(ShipTypes.CA, "重巡洋艦", "重巡"),
                new ShipType(ShipTypes.CAV, "航空巡洋艦", "航巡"),
                new ShipType(ShipTypes.CL, "軽巡洋艦", "軽巡"),
                new ShipType(ShipTypes.DD, "駆逐艦", "駆")
            ];

            ShipTypeMaster.map = {};
            ShipTypeMaster.list.forEach(function (value) {
                ShipTypeMaster.map[value.id] = value;
            });

            dfd.resolve();
        }).promise();
    }
    ShipTypeMaster.initialize = initialize;
})(ShipTypeMaster || (ShipTypeMaster = {}));
