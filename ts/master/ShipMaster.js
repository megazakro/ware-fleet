/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
var ShipMaster;
(function (ShipMaster) {
    ShipMaster.list;

    ShipMaster.map;

    function initialize() {
        ShipMaster.list = [];

        return jQuery.Deferred(function (dfd) {
            ShipMaster.list = ShipMaster.allShips();

            dfd.resolve();
        }).promise();
    }
    ShipMaster.initialize = initialize;
})(ShipMaster || (ShipMaster = {}));
