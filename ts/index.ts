
/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>

module Page {

	export var shipData: Array<Ship>;

	export var shipTypeMap: { [key: string]: ShipType };

	export function initialize() {

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
			{ id: "10", name: "駆逐艦", shortName: "駆", selected: ko.observable(selectedDefault) },
		];

		shipTypeMap = {};
		shipTypeArray.forEach((value) => {
			shipTypeMap[value.id] = value;
		});

		var myShips = [];

		var viewModel = new ViewModel(ko.observableArray(shipTypeArray), shipData, ko.observableArray(myShips));

		ko.applyBindings(viewModel);
	}

	export class ViewModel {



		constructor(
			public shipTypes: KnockoutObservableArray<ShipType>,
			public allShips: Array<Ship>,
			public myShips: KnockoutObservableArray<Ship>
			) { }

		public onShipTypeClick = (item: ShipType) => {
			item.selected(!item.selected());

			var shows = $("#ul_ship_type li.selected").map((index, element) => {
				return ".type_" + element.getAttribute("id");
			}).toArray();

			var hides = $("#ul_ship_type li.unselected").map((index, element) => {
				return ".type_" + element.getAttribute("id");
			}).toArray();

			if (0 < shows.length) {
				$(shows.join(",")).show();
			}

			if (0 < hides.length) {
				$(hides.join(",")).hide();
			}
		}

		public onAllShipsClick = (item: Ship) => {

			this.myShips.push(item);

		}

	}

	export class ShipType {
		constructor(
			public id: string,
			public name: string,
			public shortName: string,
			public selected: KnockoutObservable<boolean>) { }
	}

	export class Ship {
		constructor(
			public id: string,
			public name: string,
			public type: string) { }

		public shipType = (): string => {
			if (this.type in Page.shipTypeMap) {
				return "[" + Page.shipTypeMap[this.type].shortName + "]";
			}
			else {
				return "";
			}
		}
	}

}

$(document).ready(() => {

	jQuery.ajax({
		url: "/json/myship.json",
		dataType: "JSON"
	})
		.then((data) => {

			Page.shipData = [];
			data.ships.forEach((value) => {
				Page.shipData.push(new Page.Ship(value.id, value.name, value.type));
			});

			console.log("Page.shipData.length:" + Page.shipData.length);
		})
		.then(Page.initialize);
});
