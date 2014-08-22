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
                new ShipType("01", "戦艦", "戦"),
                new ShipType("02", "航空戦艦", "航戦"),
                new ShipType("03", "正規空母", "航"),
                new ShipType("04", "装甲空母", "装母"),
                new ShipType("05", "軽空母", "軽母"),
                new ShipType("06", "水上機母艦", "水母"),
                new ShipType("07", "重巡洋艦", "重巡"),
                new ShipType("08", "航空巡洋艦", "航巡"),
                new ShipType("09", "軽巡洋艦", "軽巡"),
                new ShipType("10", "駆逐艦", "駆")
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

var ShipType = (function () {
    function ShipType(id, name, shortName) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.selected = ko.observable(true);
    }
    return ShipType;
})();
