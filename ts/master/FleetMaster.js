/// <reference path="../common/LocalStorage.ts"/>
var FleetMaster;
(function (FleetMaster) {
    var fleetSeq;

    var list;

    function initialize(_list) {
        if (localStorage[LS_KEY.FINAL_FLEET_SEQ]) {
            fleetSeq = parseInt(localStorage[LS_KEY.FINAL_FLEET_SEQ]);
        } else {
            fleetSeq = 0;
        }

        list = _list;

        return jQuery.Deferred(function (dfd) {
            dfd.resolve();
        }).promise();
    }
    FleetMaster.initialize = initialize;

    function append(name) {
        var fleet = new Fleet(String(fleetSeq++), name);

        list.push(fleet);

        return fleet;
    }
    FleetMaster.append = append;

    function saveToStorage() {
        localStorage[LS_KEY.FINAL_FLEET_SEQ] = fleetSeq;
    }
    FleetMaster.saveToStorage = saveToStorage;
})(FleetMaster || (FleetMaster = {}));

var Fleet = (function () {
    function Fleet(fleetId, _name, _ships) {
        this.fleetId = fleetId;
        this.name = ko.observable(_name);

        if (!_ships || _ships.length < 1) {
            this.ships = ko.observableArray([]);
        } else {
            this.ships = ko.observableArray(_ships);
        }
    }
    return Fleet;
})();
