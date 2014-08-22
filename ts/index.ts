
/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/linq.d.ts"/>
/// <reference path="../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="./common/LocalStorage.ts"/>
/// <reference path="./master/ShipTypeMaster.ts"/>
/// <reference path="./master/ShipMaster.ts"/>
/// <reference path="./master/FleetMaster.ts"/>

class LsMemberItem {
	shipId: string;
	name: string;
	type: string;
	level: number;
	memberId: string;
}

module Page {

	export var memberMap: { [key: string]: MemberShip };

	var viewModel: ViewModel;

	export function initialize() {

		memberMap = {};

		var allShipToggleIsClose = false;
		if (localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE]) {
			allShipToggleIsClose = ("true" == localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE]);
		}

		var activeShipId = localStorage[LS_KEY.ACTIVE_SHIP_ID];

		viewModel = new ViewModel(allShipToggleIsClose, activeShipId);

		ko.applyBindings(viewModel);
	}

	export class ViewModel {

		constructor(
			allShipToggleHide: boolean,
			activeShipId?: string,
			_fleets?: Array<Fleet>
			) {

			this.allShips = ShipMaster.list;

			this.shipTypes = ShipTypeMaster.list;

			this.myShips = MemberShipMaster.list;

			if (activeShipId) {
				var ship = Enumerable.from(this.myShips())
					.where((item) => (item.shipId == activeShipId))
					.select((item) => item).firstOrDefault((item, index) => true, MemberShip.empty());

				this.activeShip = ko.observable(ship);
			}
			else {
				this.activeShip = ko.observable(MemberShip.empty());
			}

			this.allShipToggle = new AllShipToggle(allShipToggleHide);

			if (!_fleets || _fleets.length < 1) {
				this.myFleets = ko.observableArray([]);
			}
			else {
				this.myFleets = ko.observableArray(_fleets);
			}

			this.activeFleet = ko.observable(this.myFleets()[0]);
		}

		allShips: Array<Ship>;

		activeShip: KnockoutObservable<MemberShip>;

		activeFleet: KnockoutObservable<Fleet>;

		shipTypes: Array<ShipType>;

		myShips: KnockoutObservableArray<MemberShip>;

		myFleets: KnockoutObservableArray<Fleet>;

		allShipToggle: AllShipToggle;

		getShipTypeName(item: Ship): string {

			if (item.type in ShipTypeMaster.map) {
				return ShipTypeMaster.map[item.type].name;
			}
			else {
				return "";
			}
		}

		getShipTypeShortName(item: Ship) : string {

			if (item.type in ShipTypeMaster.map) {
				return "[" + ShipTypeMaster.map[item.type].shortName + "]";
			}
			else {
				return "";
			}
		}

		onShipTypeClick = (item: ShipType) => {
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

		onAllShipsClick = (selected: Ship) => {
			MemberShipMaster.insert(selected.shipId, selected.name, selected.type, selected.level);
			saveToStorage();
		}

		onMyShipsClick = (item: MemberShip) => {
			this.activeShip(item);
			saveToStorage();
		}

		onMyFleetsClick = (item: Fleet) => {
			this.activeFleet(item);
		}

		onAllShipToggleClick = () => {
			this.allShipToggle.isClose(!this.allShipToggle.isClose());

			saveToStorage();
		}

		onAddShipClick = () => {

			console.log(this.activeFleet().ships());

			this.activeFleet().ships.push(this.activeShip());

			console.log(this.activeFleet().ships());

			saveToStorage();
		}

		onRemoveShipClick = () => {
			MemberShipMaster.remove(this.activeShip());
			this.activeShip(MemberShip.empty());

			saveToStorage();
		}

		onAddFleetClick = () => {

			// this.myFleets.push(new Fleet("第" + (this.myFleets().length + 1) + "艦隊"));

			saveToStorage();
		}

		onRemoveFleetShipClick = () => {
			alert();
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
	export function saveToStorage() {

		console.log("savePromised:" + savePromised);
		if (!savePromised) {

			savePromised = true;

			$.Deferred((dfd) => {
				setTimeout(dfd.resolve, 1000);
			}).promise()
				.then(() => {

					localStorage[LS_KEY.MEMBER] = JSON.stringify(viewModel.myShips());
					localStorage[LS_KEY.ALLSHIP_TOGGLE_IS_CLOSE] = viewModel.allShipToggle.isClose();
					localStorage[LS_KEY.ACTIVE_SHIP_ID] = viewModel.activeShip().shipId;
					// localStorage[LS_KEY.ACTIVE_FLEET_ID] = viewModel.activeFleet().fleetId;

					FleetMaster.saveToStorage();

				}).done(() => {
					savePromised = false;
				});
		}
	}

}

$(document).ready(() => {

	ShipMaster.initialize()
		.then(() => {
			MemberShipMaster.initialize(Page.saveToStorage);
		})
		.then(ShipTypeMaster.initialize)
		.then(FleetMaster.initialize)
		.done(Page.initialize);
});
