﻿/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>
var Page;
(function (Page) {
    Page.shipData;

    Page.shipTypeMap;

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

        var viewModel = new ViewModel(ko.observableArray(shipTypeArray), Page.shipData);

        ko.applyBindings(viewModel);
    }
    Page.initialize = initialize;

    function onShipTypeSelected() {
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
    }

    var ViewModel = (function () {
        function ViewModel(shipTypes, ships) {
            this.shipTypes = shipTypes;
            this.ships = ships;
        }
        ViewModel.prototype.shipTypeSelected = function (item) {
            item.selected(!item.selected());
            onShipTypeSelected();
        };
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
        function Ship(id, name, type) {
            this.id = id;
            this.name = name;
            this.type = type;
        }
        Ship.prototype.shipType = function () {
            return "[" + Page.shipTypeMap[this.type].shortName + "]";
        };
        return Ship;
    })();
    Page.Ship = Ship;
})(Page || (Page = {}));

$(document).ready(function () {
    jQuery.ajax({
        url: "/json/myship.json",
        dataType: "JSON"
    }).then(function (data) {
        Page.shipData = [];
        data.ships.forEach(function (value) {
            Page.shipData.push(new Page.Ship(value.id, value.name, value.type));
        });

        console.log("Page.shipData.length:" + Page.shipData.length);
    }).then(Page.initialize);
});
