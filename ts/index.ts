
/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/linq.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="./master/ShipTypeMaster.ts"/>

class LS_KEY {
	static ALLSHIP_TOGGLE_IS_CLOSE: string = "ALLSHIP_TOGGLE_IS_CLOSE";
	static MEMBER: string = "MEMBER";
	static ACTIVE_SHIP_ID = "ACTIVE_SHIP_ID";
	static ACTIVE_FLEET_ID = "ACTIVE_FLEET_ID";
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

		var activeShipId = localStorage[LS_KEY.ACTIVE_SHIP_ID];

		viewModel = new ViewModel(shipData, myShips, false, activeShipId);

		ko.applyBindings(viewModel);
	}

	export class ViewModel {

		constructor(
			public allShips: Array<Ship>,
			myShips: Array<Ship>,
			allShipToggleHide: boolean,
			activeShipId?: string,
			_fleets?: Array<Fleet>
			) {

			this.shipTypes = ShipTypeMaster.list;

			if (myShips) {
				this.myShips = ko.observableArray(myShips);
			}
			else {
				this.myShips = ko.observableArray([]);
			}

			if (activeShipId) {
				var ship = Enumerable.from(this.myShips())
					.where((item) => (item.shipId == activeShipId))
					.select((item) => item).firstOrDefault((item, index) => true, new Ship("", "", ""));

				this.activeShip = ko.observable(ship);
			}
			else {
				this.activeShip = ko.observable(new Ship("", "", ""));
			}

			this.allShipToggle = new AllShipToggle(allShipToggleHide);

			if (!_fleets || _fleets.length < 1) {
				this.myFleets = ko.observableArray([new Fleet("第1艦隊")]);
			}
			else {
				this.myFleets = ko.observableArray(_fleets);
			}

			this.activeFleet = ko.observable(this.myFleets()[0]);
		}

		activeShip: KnockoutObservable<Ship>;

		activeFleet: KnockoutObservable<Fleet>;

		shipTypes: Array<ShipType>;

		myShips: KnockoutObservableArray<Ship>;

		myFleets: KnockoutObservableArray<Fleet>;

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

			saveToStorage();
		}

		public onMyFleetsClick = (item: Fleet) => {
			this.activeFleet(item);
		}

		public onAllShipToggleClick = () => {
			this.allShipToggle.isClose(!this.allShipToggle.isClose());

			saveToStorage();
		}

		public onAddShipClick = () => {

			console.log(this.activeFleet().ships());

			this.activeFleet().ships.push(this.activeShip());

			console.log(this.activeFleet().ships());

			saveToStorage();
		}

		public onRemoveShipClick = () => {
			this.myShips.remove(this.activeShip());
			this.activeShip(new Ship("", "", ""));

			saveToStorage();
		}

		public onAddFleetClick = () => {

			this.myFleets.push(new Fleet("第" + (this.myFleets().length + 1) + "艦隊"));

			saveToStorage();
		}

		public onRemoveFleetShipClick = () => {
			alert();
		}
	}

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

	export class Fleet {

		constructor(
			_name: string,
			_ships?: Array<Ship>
			) {

			this.name = ko.observable(_name);

			if (!_ships || _ships.length < 1) {
				this.ships = ko.observableArray([]);
			}
			else {
				this.ships = ko.observableArray(_ships);
			}
		}

		public name: KnockoutObservable<string>;
		public ships: KnockoutObservableArray<Ship>;
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
					localStorage[LS_KEY.ACTIVE_SHIP_ID] = viewModel.activeShip().shipId;
					localStorage[LS_KEY.ACTIVE_FLEET_ID] = viewModel.activeFleet().name;

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
