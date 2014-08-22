
/// <reference path="../common/LocalStorage.ts"/>

module FleetMaster {

	var fleetSeq: number;

	var list: Array<Fleet>;

	export function initialize(_list?: Array<Fleet>): JQueryPromise<{}> {

		if (localStorage[LS_KEY.FINAL_FLEET_SEQ]) {
			fleetSeq = parseInt(localStorage[LS_KEY.FINAL_FLEET_SEQ]);
		}
		else {
			fleetSeq = 0;
		}

		list = _list;

		return jQuery.Deferred((dfd) => {
			dfd.resolve();
		}).promise();
	}

	export function append(name: string): Fleet {

		var fleet = new Fleet(String(fleetSeq++), name);

		list.push(fleet);

		return fleet;
	}

	export function saveToStorage() {

		localStorage[LS_KEY.FINAL_FLEET_SEQ] = fleetSeq;

	}

}

class Fleet {

	constructor(
		public fleetId: string,
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

