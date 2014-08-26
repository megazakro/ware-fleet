/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/linq.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="./common/LocalStorage.ts"/>
/// <reference path="./master/ShipTypeMaster.ts"/>
/// <reference path="./master/ShipMaster.ts"/>
/// <reference path="./master/MemberShipMaster.ts"/>
/// <reference path="./master/FleetMaster.ts"/>
var Page;
(function (Page) {
    Page.memberMap;

    var viewModel;

    function initialize() {
        Page.memberMap = {};

        var allShipToggleIsClose = false;
        if (localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE]) {
            allShipToggleIsClose = ("true" == localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE]);
        }

        var activeShipId = localStorage[LS_KEY.ACTIVE_SHIP_ID];

        viewModel = new ViewModel(allShipToggleIsClose, activeShipId);

        ko.applyBindings(viewModel);
    }
    Page.initialize = initialize;

    var ViewModel = (function () {
        function ViewModel(allShipToggleHide, activeShipId) {
            var _this = this;
            this.memberShip = {
                getName: function (id) {
                    return MemberShipMaster.getMember(id).name;
                }
            };
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
            this.onAllShipsClick = function (selected) {
                MemberShipMaster.insert(selected.shipId, selected.name, selected.type, selected.level);
                saveToStorage();
            };
            this.onMyShipsClick = function (item) {
                _this.activeShip(item);
                saveToStorage();
            };
            this.onAllShipToggleClick = function () {
                _this.allShipToggle.isClose(!_this.allShipToggle.isClose());

                saveToStorage();
            };
            this.onAddShipClick = function () {
                _this.activeFleet().o_memberIds.push(_this.activeShip().memberId);

                saveToStorage();
            };
            this.onRemoveShipClick = function () {
                MemberShipMaster.remove(_this.activeShip());
                _this.activeShip(MemberShip.empty());

                saveToStorage();
            };
            this.member = {
                remove: function () {
                    MemberShipMaster.remove(_this.activeShip());
                    _this.activeShip(MemberShip.empty());

                    saveToStorage();
                }
            };
            this.fleet = {
                activate: function (item) {
                    _this.activeFleet(item);
                },
                addFleet: function () {
                    FleetMaster.insert();
                    saveToStorage();
                },
                removeFleet: function () {
                    FleetMaster.remove(_this.activeFleet());
                    saveToStorage();
                },
                addMember: function (member) {
                    _this.activeFleet().appendMember(member.memberId);
                    saveToStorage();
                },
                removeMember: function (member) {
                    _this.activeFleet().removeMember(member.memberId);
                    saveToStorage();
                }
            };
            this.allShips = ShipMaster.list;

            this.shipTypes = ShipTypeMaster.list;

            this.myShips = MemberShipMaster.list;

            if (activeShipId) {
                var ship = Enumerable.from(this.myShips()).where(function (item) {
                    return (item.shipId == activeShipId);
                }).select(function (item) {
                    return item;
                }).firstOrDefault(function (item, index) {
                    return true;
                }, MemberShip.empty());

                this.activeShip = ko.observable(ship);
            } else {
                this.activeShip = ko.observable(MemberShip.empty());
            }

            this.allShipToggle = new AllShipToggle(allShipToggleHide);

            this.myFleets = FleetMaster.list;

            if (this.myFleets().length < 1) {
                var fleet = FleetMaster.insert();
            }

            this.activeFleet = ko.observable(this.myFleets()[0]);
        }
        ViewModel.prototype.activeFleetMembers = function () {
            var list = [];

            this.activeFleet().o_memberIds().forEach(function (value, index) {
                list.push(MemberShipMaster.getMember(value));
            });

            return list;
        };

        ViewModel.prototype.getShipTypeName = function (item) {
            if (item.type in ShipTypeMaster.map) {
                return ShipTypeMaster.map[item.type].name;
            } else {
                return "";
            }
        };

        ViewModel.prototype.getShipTypeShortName = function (item) {
            if (item.type in ShipTypeMaster.map) {
                return "[" + ShipTypeMaster.map[item.type].shortName + "]";
            } else {
                return "";
            }
        };

        ViewModel.prototype.getMemberShip = function (id) {
            return MemberShipMaster.getMember(id);
        };
        return ViewModel;
    })();
    Page.ViewModel = ViewModel;

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
                setTimeout(dfd.resolve, 1000);
            }).promise().then(function () {
                localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE] = viewModel.allShipToggle.isClose();
                localStorage[LS_KEY.ACTIVE_SHIP_ID] = viewModel.activeShip().shipId;
                localStorage[LS_KEY.ACTIVE_FLEET_ID] = viewModel.activeFleet().fleetId;

                MemberShipMaster.saveToStorage();
                FleetMaster.saveToStorage();
            }).done(function () {
                savePromised = false;
            });
        }
    }
    Page.saveToStorage = saveToStorage;
})(Page || (Page = {}));

$(document).ready(function () {
    ShipMaster.initialize().then(function () {
        MemberShipMaster.initialize(Page.saveToStorage);
    }).then(ShipTypeMaster.initialize).then(function () {
        FleetMaster.initialize(Page.saveToStorage);
    }).done(Page.initialize);
});
