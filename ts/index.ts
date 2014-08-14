
/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="./master/ShipTypeMaster.ts"/>

class LS_KEY {
	static ALLSHIP_TOGGLE_IS_CLOSE: string = "ALLSHIP_TOGGLE_IS_CLOSE";
	static MEMBER: string = "MEMBER";
}

class LsMemberItem {
	shipId: string;
	name: string;
	type: string;
	level: number;
	memberId: string;
}

module Page {

	export var shipData: Array<Ship>;

	export var memberMap: { [key: string]: Ship };

	var seq: number = 0;

	var viewModel: ViewModel;

	export function initialize() {

		ShipTypeMaster.initialize();

		memberMap = {};

		var myShips: Array<Ship> = [];
		if (localStorage[LS_KEY.MEMBER]) {

			var value: Array<any> = JSON.parse(localStorage[LS_KEY.MEMBER]);

			if (value && 0 < value.length) {

				value.forEach((item: LsMemberItem) => {
					myShips.push(new Ship(item.shipId, item.name, item.type, item.level, item.memberId));
				});
			}
		}

		viewModel = new ViewModel(shipData, myShips, false);

		ko.applyBindings(viewModel);
	}

	export class ViewModel {

		constructor(
			public allShips: Array<Ship>,
			myShips: Array<Ship>,
			allShipToggleHide: boolean
			) {

			this.activeShip = ko.observable(new Ship("", "", "")),

			this.shipTypes = ShipTypeMaster.list;

			if (myShips) {
				this.myShips = ko.observableArray(myShips);
			}
			else {
				this.myShips = ko.observableArray([]);
			}

			this.allShipToggle = new AllShipToggle(allShipToggleHide);
		}

		activeShip: KnockoutObservable<Ship>;

		shipTypes: Array<ShipType>;

		myShips: KnockoutObservableArray<Ship>;

		allShipToggle: AllShipToggle;

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
			memberMap[item.memberId] = item;

			saveToStorage();
		}

		public onMyShipsClick = (item: Ship) => {
			this.activeShip(item);
		}

		public onAllShipToggleClick = () => {
			this.allShipToggle.isClose(!this.allShipToggle.isClose());

			saveToStorage();
		}

		public onRemoveShipClick = () => {
			this.myShips.remove(this.activeShip());
			this.activeShip(new Ship("", "", ""));

			saveToStorage();
		}
	}

	//export class ShipType {
	//	constructor(
	//		public id: string,
	//		public name: string,
	//		public shortName: string,
	//		public selected: KnockoutObservable<boolean>) { }
	//}

	export class Ship {
		constructor(
			public shipId: string,
			public name: string,
			public type: string,
			public level?: number,
			public memberId?: string
			) {

			if (!memberId) {
				this.memberId = shipId + "_" + seq++;
			}

			if (0 < level) {
				this.o_level = ko.observable(level);
			}
			else {
				this.o_level = ko.observable(0);
			}
			this.o_level.subscribe((value) => {
				this.level = value;
				saveToStorage();
			});

		}

		o_level: KnockoutObservable<number>;

		shipType = (): string => {
			if (this.type in ShipTypeMaster.map) {
				return "[" + ShipTypeMaster.map[this.type].shortName + "]";
			}
			else {
				return "";
			}
		}

		shipTypeLong = (): string => {
			if (this.type in ShipTypeMaster.map) {
				return ShipTypeMaster.map[this.type].name;
			}
			else {
				return "";
			}
		}

	}

	export class AllShipToggle {

		constructor(isClose: boolean) {
			this.isClose = ko.observable(isClose);
		}

		isClose: KnockoutObservable<boolean>;

		text = (): string => {

			if (this.isClose()) {
				return "+";
			}
			return "-";
		}
	}

	var savePromised = false;
	function saveToStorage() {

		console.log("savePromised:" + savePromised);
		if (!savePromised) {

			savePromised = true;

			$.Deferred((dfd) => {
				setTimeout(dfd.resolve, 3000);
			}).promise()
				.then(() => {

					localStorage[LS_KEY.MEMBER] = JSON.stringify(viewModel.myShips());
					localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE] = viewModel.allShipToggle.isClose();

				}).done(() => {
					savePromised = false;
				});
		}
	}

}

$(document).ready(() => {

	jQuery.ajax({
		url: "./json/myship.json",
		dataType: "JSON"
	})
		.then((data) => {

			Page.shipData = [];
			data.ships.forEach((value) => {
				Page.shipData.push(new Page.Ship(value.id, value.name, value.type, 1));
			});

		})
		.then(Page.initialize);
});
