/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/linq.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="./master/ShipTypeMaster.ts"/>
var LS_KEY = (function () {
    function LS_KEY() {
    }
    LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE = "ALLSHIP_TOGGLE_IS_CLOSE";
    LS_KEY.MEMBER = "MEMBER";
    LS_KEY.ACTIVE_SHIP_ID = "ACTIVE_SHIP_ID";
    LS_KEY.ACTIVE_FLEET_ID = "ACTIVE_FLEET_ID";
    return LS_KEY;
})();

var LsMemberItem = (function () {
    function LsMemberItem() {
    }
    return LsMemberItem;
})();

var Page;
(function (Page) {
    Page.shipData;

    Page.memberMap;

    var seq = 0;

    var viewModel;

    function initialize() {
        ShipTypeMaster.initialize();

        Page.memberMap = {};

        var myShips = [];
        if (localStorage[LS_KEY.MEMBER]) {
            var value = JSON.parse(localStorage[LS_KEY.MEMBER]);

            if (value && 0 < value.length) {
                value.forEach(function (item) {
                    myShips.push(new Ship(item.shipId, item.name, item.type, item.level, item.memberId));
                });
            }
        }

        var activeShipId = localStorage[LS_KEY.ACTIVE_SHIP_ID];

        viewModel = new ViewModel(Page.shipData, myShips, false, activeShipId);

        ko.applyBindings(viewModel);
    }
    Page.initialize = initialize;

    var ViewModel = (function () {
        function ViewModel(allShips, myShips, allShipToggleHide, activeShipId, _fleets) {
            var _this = this;
            this.allShips = allShips;
            this.onShipTypeClick = function (item) {
                item.selected(!item.selected());

                var shows = $("#ul_ship_type li.selected").map(function (index, element) {
                    return ".type_" + element.getAttribute("id");
                }).toArray();

                var hides = $("#ul_ship_type li.unselected").map(function (index, element) {
                    return ".type_" + element.getAttribute("id");
                }).toArray();

                if (0 < shows.length) {
                    $(shows.join(",")).show();
                }

                if (0 < hides.length) {
                    $(hides.join(",")).hide();
                }
            };
            this.onAllShipsClick = function (item) {
                _this.myShips.push(item);
                Page.memberMap[item.memberId] = item;

                saveToStorage();
            };
            this.onMyShipsClick = function (item) {
                _this.activeShip(item);

                saveToStorage();
            };
            this.onMyFleetsClick = function (item) {
                _this.activeFleet(item);
            };
            this.onAllShipToggleClick = function () {
                _this.allShipToggle.isClose(!_this.allShipToggle.isClose());

                saveToStorage();
            };
            this.onAddShipClick = function () {
                console.log(_this.activeFleet().ships());

                _this.activeFleet().ships.push(_this.activeShip());

                console.log(_this.activeFleet().ships());

                saveToStorage();
            };
            this.onRemoveShipClick = function () {
                _this.myShips.remove(_this.activeShip());
                _this.activeShip(new Ship("", "", ""));

                saveToStorage();
            };
            this.onAddFleetClick = function () {
                _this.myFleets.push(new Fleet("第" + (_this.myFleets().length + 1) + "艦隊"));

                saveToStorage();
            };
            this.onRemoveFleetShipClick = function () {
                alert();
            };
            this.shipTypes = ShipTypeMaster.list;

            if (myShips) {
                this.myShips = ko.observableArray(myShips);
            } else {
                this.myShips = ko.observableArray([]);
            }

            if (activeShipId) {
                var ship = Enumerable.from(this.myShips()).where(function (item) {
                    return (item.shipId == activeShipId);
                }).select(function (item) {
                    return item;
                }).firstOrDefault(function (item, index) {
                    return true;
                }, new Ship("", "", ""));

                this.activeShip = ko.observable(ship);
            } else {
                this.activeShip = ko.observable(new Ship("", "", ""));
            }

            this.allShipToggle = new AllShipToggle(allShipToggleHide);

            if (!_fleets || _fleets.length < 1) {
                this.myFleets = ko.observableArray([new Fleet("第1艦隊")]);
            } else {
                this.myFleets = ko.observableArray(_fleets);
            }

            this.activeFleet = ko.observable(this.myFleets()[0]);
        }
        return ViewModel;
    })();
    Page.ViewModel = ViewModel;

    var Ship = (function () {
        function Ship(shipId, name, type, level, memberId) {
            var _this = this;
            this.shipId = shipId;
            this.name = name;
            this.type = type;
            this.level = level;
            this.memberId = memberId;
            this.shipType = function () {
                if (_this.type in ShipTypeMaster.map) {
                    return "[" + ShipTypeMaster.map[_this.type].shortName + "]";
                } else {
                    return "";
                }
            };
            this.shipTypeLong = function () {
                if (_this.type in ShipTypeMaster.map) {
                    return ShipTypeMaster.map[_this.type].name;
                } else {
                    return "";
                }
            };
            if (!memberId) {
                this.memberId = shipId + "_" + seq++;
            }

            if (0 < level) {
                this.o_level = ko.observable(level);
            } else {
                this.o_level = ko.observable(0);
            }
            this.o_level.subscribe(function (value) {
                _this.level = value;
                saveToStorage();
            });
        }
        return Ship;
    })();
    Page.Ship = Ship;

    var Fleet = (function () {
        function Fleet(_name, _ships) {
            this.name = ko.observable(_name);

            if (!_ships || _ships.length < 1) {
                this.ships = ko.observableArray([]);
            } else {
                this.ships = ko.observableArray(_ships);
            }
        }
        return Fleet;
    })();
    Page.Fleet = Fleet;

    var AllShipToggle = (function () {
        function AllShipToggle(isClose) {
            var _this = this;
            this.text = function () {
                if (_this.isClose()) {
                    return "+";
                }
                return "-";
            };
            this.isClose = ko.observable(isClose);
        }
        return AllShipToggle;
    })();
    Page.AllShipToggle = AllShipToggle;

    var savePromised = false;
    function saveToStorage() {
        console.log("savePromised:" + savePromised);
        if (!savePromised) {
            savePromised = true;

            $.Deferred(function (dfd) {
                setTimeout(dfd.resolve, 3000);
            }).promise().then(function () {
                localStorage[LS_KEY.MEMBER] = JSON.stringify(viewModel.myShips());
                localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE] = viewModel.allShipToggle.isClose();
                localStorage[LS_KEY.ACTIVE_SHIP_ID] = viewModel.activeShip().shipId;
                localStorage[LS_KEY.ACTIVE_FLEET_ID] = viewModel.activeFleet().name;
            }).done(function () {
                savePromised = false;
            });
        }
    }
})(Page || (Page = {}));

$(document).ready(function () {
    jQuery.ajax({
        url: "./json/myship.json",
        dataType: "JSON"
    }).then(function (data) {
        Page.shipData = [];
        data.ships.forEach(function (value) {
            Page.shipData.push(new Page.Ship(value.id, value.name, value.type, 1));
        });
    }).then(Page.initialize);
});
