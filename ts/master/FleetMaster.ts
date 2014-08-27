
/// <reference path="../common/LocalStorage.ts"/>

module FleetMaster {

	var fleetSeq: number;

	var onFleetNameSubscribe: () => void;

	export var list: KnockoutObservableArray<Fleet>;

	export function initialize(_onFleetNameSubscribe: () => void): JQueryPromise<{}> {

		onFleetNameSubscribe = _onFleetNameSubscribe;

		return jQuery.Deferred((dfd) => {

			if (localStorage[LS_KEY.FINAL_FLEET_SEQ]) {
				fleetSeq = parseInt(localStorage[LS_KEY.FINAL_FLEET_SEQ]);
				if (isNaN(fleetSeq)) {
					fleetSeq = 0;
				}
			}
			else {
				fleetSeq = 0;
			}

			var _list: Array<Fleet> = [];
			if (localStorage[LS_KEY.FLEETS]) {

				var value: Array<any> = JSON.parse(localStorage[LS_KEY.FLEETS]);

				console.log(localStorage[LS_KEY.FLEETS]);

				if (value && 0 < value.length) {
					value.forEach((item: FleetsItem) => {
						_list.push(new Fleet(item.shipId, item.name, item.memberIds, _onFleetNameSubscribe));
					});
				}
			}

			list = ko.observableArray(_list);

			dfd.resolve();
		}).promise();
	}

	export function insert(name?: string): Fleet {

		var fleetName : string;
		if (!name) {
			fleetName = "第" + (list().length + 1) + "艦隊";
		}
		else {
			fleetName = name;
		}

		var fleet = new Fleet(String(fleetSeq++), fleetName, [], onFleetNameSubscribe);

		list.push(fleet);

		return fleet;
	}

	export function remove(fleet: Fleet) {
		list.remove(fleet);
	}

	export function saveToStorage() {

		localStorage[LS_KEY.FINAL_FLEET_SEQ] = fleetSeq;

		localStorage[LS_KEY.FLEETS] = JSON.stringify(list());

		console.log(localStorage[LS_KEY.FLEETS]);
	}

}

class Fleet {

	constructor(
		public fleetId: string,
		public name: string,
		public memberIds: Array<string>,
		onItemSubscribe?: () => void
		) {

		this.o_name = ko.observable(name);

		if (!memberIds || memberIds.length < 1) {
			this.o_memberIds = ko.observableArray([]);
		}
		else {
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

		this.o_name.subscribe((value) => {
			this.name = value;
			if (onItemSubscribe) {
				onItemSubscribe();
			}
		});

	}

	public o_name: KnockoutObservable<string>;
	public o_memberIds: KnockoutObservableArray<string>;

	public appendMember(id: string) {

		alert(this.memberIds);
		alert(id + " " + this.memberIds.indexOf("" + id));

		if (this.memberIds.length < 6) {
			if (this.memberIds.indexOf("" + id) < 0) {
				this.o_memberIds.push("" + id);
				this.memberIds = this.o_memberIds();
			}
		}
	}

	public removeMember(id: string) {

		alert(id + " " + this.memberIds.indexOf(id));

		if (0 <= this.memberIds.indexOf(id)) {
			this.o_memberIds.remove(id);
			this.memberIds = this.o_memberIds();
		}
	}

}

