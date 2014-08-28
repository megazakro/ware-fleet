/// <reference path="../common/LocalStorage.ts"/>
var FleetMaster;
(function (FleetMaster) {
    var fleetSeq;

    var onFleetNameSubscribe;

    FleetMaster.list;

    function initialize(_onFleetNameSubscribe) {
        onFleetNameSubscribe = _onFleetNameSubscribe;

        return jQuery.Deferred(function (dfd) {
            if (localStorage[LS_KEY.FINAL_FLEET_SEQ]) {
                fleetSeq = parseInt(localStorage[LS_KEY.FINAL_FLEET_SEQ]);
                if (isNaN(fleetSeq)) {
                    fleetSeq = 0;
                }
            } else {
                fleetSeq = 0;
            }

            var _list = [];
            if (localStorage[LS_KEY.FLEETS]) {
                var value = JSON.parse(localStorage[LS_KEY.FLEETS]);

                console.log(localStorage[LS_KEY.FLEETS]);

                if (value && 0 < value.length) {
                    value.forEach(function (item) {
                        _list.push(new Fleet(item.fleetId, item.name, item.memberIds, _onFleetNameSubscribe));
                    });
                }
            }

            FleetMaster.list = ko.observableArray(_list);

            dfd.resolve();
        }).promise();
    }
    FleetMaster.initialize = initialize;

    function getLastFleet() {
        return FleetMaster.list()[FleetMaster.list().length - 1];
    }
    FleetMaster.getLastFleet = getLastFleet;

    function insert(name) {
        var fleetName;
        if (!name) {
            fleetName = "第" + (FleetMaster.list().length + 1) + "艦隊";
        } else {
            fleetName = name;
        }

        var fleetId = String(fleetSeq++);
        var fleet = new Fleet(fleetId, fleetName, [], onFleetNameSubscribe);

        FleetMaster.list.push(fleet);

        return fleet;
    }
    FleetMaster.insert = insert;

    function remove(fleet) {
        if (FleetMaster.list().length <= 1) {
            return;
        }

        FleetMaster.list.remove(fleet);
    }
    FleetMaster.remove = remove;

    function saveToStorage() {
        localStorage[LS_KEY.FINAL_FLEET_SEQ] = fleetSeq;

        localStorage[LS_KEY.FLEETS] = JSON.stringify(FleetMaster.list());

        console.log(localStorage[LS_KEY.FLEETS]);
    }
    FleetMaster.saveToStorage = saveToStorage;
})(FleetMaster || (FleetMaster = {}));

var Fleet = (function () {
    function Fleet(fleetId, name, memberIds, onItemSubscribe) {
        var _this = this;
        this.fleetId = fleetId;
        this.name = name;
        this.memberIds = memberIds;
        this.o_name = ko.observable(name);

        if (!memberIds || memberIds.length < 1) {
            this.o_memberIds = ko.observableArray([]);
        } else {
            this.o_memberIds = ko.observableArray(memberIds);
        }

        //this.o_memberIds.subscribe((newValue) => {
        //	// alert(newValue);
        //	if (0 < newValue.length) {
        //		this.memberIds = newValue;
        //	}
        //	//if (onItemSubscribe) {
        //	//	onItemSubscribe();
        //	//}
        //});
        this.o_name.subscribe(function (value) {
            _this.name = value;
            if (onItemSubscribe) {
                onItemSubscribe();
            }
        });
    }
    Fleet.prototype.appendMember = function (id) {
        if (this.memberIds.length < 6) {
            if (this.memberIds.indexOf(id) < 0) {
                this.o_memberIds.push(id);
                this.memberIds = this.o_memberIds();
            }
        }
    };

    Fleet.prototype.removeMember = function (id) {
        if (0 <= this.memberIds.indexOf(id)) {
            this.o_memberIds.remove(id);
            this.memberIds = this.o_memberIds();
        }
    };
    return Fleet;
})();
