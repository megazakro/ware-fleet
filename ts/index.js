/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>
var LS_KEY = (function () {
    function LS_KEY() {
    }
    LS_KEY.SEQ = "SEQ";
    LS_KEY.MEMBER = "MEMBER";
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

    Page.shipTypeMap;
    Page.memberMap;

    var seq = 0;

    var viewModel;

    function initialize() {
        var selectedDefault = true;
        var shipTypeArray = [
            { id: "01", name: "戦艦", shortName: "戦", selected: ko.observable(selectedDefault) },
            { id: "02", name: "航空戦艦", shortName: "戦", selected: ko.observable(selectedDefault) },
            { id: "03", name: "正規空母", shortName: "航", selected: ko.observable(selectedDefault) },
            { id: "04", name: "装甲空母", shortName: "装母", selected: ko.observable(selectedDefault) },
            { id: "05", name: "軽空母", shortName: "軽母", selected: ko.observable(selectedDefault) },
            { id: "06", name: "水上機母艦", shortName: "水母", selected: ko.observable(selectedDefault) },
            { id: "07", name: "重巡洋艦", shortName: "重巡", selected: ko.observable(selectedDefault) },
            { id: "08", name: "航空巡洋艦", shortName: "航巡", selected: ko.observable(selectedDefault) },
            { id: "09", name: "軽巡洋艦", shortName: "軽巡", selected: ko.observable(selectedDefault) },
            { id: "10", name: "駆逐艦", shortName: "駆", selected: ko.observable(selectedDefault) }
        ];

        Page.shipTypeMap = {};
        shipTypeArray.forEach(function (value) {
            Page.shipTypeMap[value.id] = value;
        });

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

        viewModel = new ViewModel(ko.observableArray(shipTypeArray), Page.shipData, ko.observable(new Ship("", "", "")), myShips);

        ko.applyBindings(viewModel);
    }
    Page.initialize = initialize;

    var ViewModel = (function () {
        function ViewModel(shipTypes, allShips, activeShip, myShips) {
            var _this = this;
            this.shipTypes = shipTypes;
            this.allShips = allShips;
            this.activeShip = activeShip;
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
            };
            if (myShips) {
                this.myShips = ko.observableArray(myShips);
            } else {
                this.myShips = ko.observableArray([]);
            }
        }
        return ViewModel;
    })();
    Page.ViewModel = ViewModel;

    var ShipType = (function () {
        function ShipType(id, name, shortName, selected) {
            this.id = id;
            this.name = name;
            this.shortName = shortName;
            this.selected = selected;
        }
        return ShipType;
    })();
    Page.ShipType = ShipType;

    var Ship = (function () {
        function Ship(shipId, name, type, level, memberId) {
            var _this = this;
            this.shipId = shipId;
            this.name = name;
            this.type = type;
            this.level = level;
            this.memberId = memberId;
            this.shipType = function () {
                if (_this.type in Page.shipTypeMap) {
                    return "[" + Page.shipTypeMap[_this.type].shortName + "]";
                } else {
                    return "";
                }
            };
            this.shipTypeLong = function () {
                if (_this.type in Page.shipTypeMap) {
                    return Page.shipTypeMap[_this.type].name;
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

    function saveToStorage() {
        localStorage[LS_KEY.MEMBER] = JSON.stringify(viewModel.myShips());
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
