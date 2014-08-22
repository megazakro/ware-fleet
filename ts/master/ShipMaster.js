/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
var ShipMaster;
(function (ShipMaster) {
    ShipMaster.list;

    ShipMaster.map;

    function initialize() {
        ShipMaster.list = [];

        return jQuery.Deferred(function (dfd) {
            jQuery.ajax({
                url: "./json/myship.json",
                dataType: "JSON"
            }).then(function (data) {
                data.ships.forEach(function (value) {
                    ShipMaster.list.push(new Ship(value.id, value.name, value.type, 1));
                });
            }).done(function () {
                dfd.resolve();
            });
        }).promise();
    }
    ShipMaster.initialize = initialize;
})(ShipMaster || (ShipMaster = {}));

var Ship = (function () {
    function Ship(shipId, name, type, level) {
        this.shipId = shipId;
        this.name = name;
        this.type = type;
        this.level = level;
    }
    return Ship;
})();
