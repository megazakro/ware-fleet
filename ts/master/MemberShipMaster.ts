
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="./ShipMaster.ts"/>

module MemberShipMaster {

	var memberSeq: number;

	var onLevelSubscribe: () => void;

	export var list: KnockoutObservableArray<MemberShip>;

	export var map: { [key: string]: Ship };

	export function initialize(_onLevelSubscribe: () => void): JQueryPromise<{}> {

		onLevelSubscribe = _onLevelSubscribe;

		return jQuery.Deferred((dfd) => {

			if (localStorage[LS_KEY.FINAL_FLEET_SEQ]) {
				memberSeq = parseInt(localStorage[LS_KEY.FINAL_MEMBER_SEQ]);
			}
			else {
				memberSeq = 0;
			}

			var _list: Array<MemberShip> = [];
			if (localStorage[LS_KEY.MEMBER]) {

				var value: Array<any> = JSON.parse(localStorage[LS_KEY.MEMBER]);

				if (value && 0 < value.length) {

					value.forEach((item: LsMemberItem) => {
						_list.push(new MemberShip(item.shipId, item.name, item.type, item.level, item.memberId, onLevelSubscribe));
					});
				}
			}

			list = ko.observableArray(_list);

			dfd.resolve();
		}).promise();
	}

	export function insert(shipId: string, name: string, type: string, level: number) : MemberShip {

		var member = new MemberShip(shipId, name, type, level, String(memberSeq++), onLevelSubscribe);

		list.push(member);

		return member;
	}

	export function remove(memberShip : MemberShip) {
		list.remove(memberShip);
	}

}

class MemberShip extends Ship {

	constructor(public shipId: string,
		public name: string,
		public type: string,
		public level: number,
		public memberId: string,
		onLevelSubscribe?: () => void) {

		super(shipId, name, type, level);

		if (0 < level) {
			this.o_level = ko.observable(level);
		}
		else {
			this.o_level = ko.observable(0);
		}

		this.o_level.subscribe((value) => {
			this.level = value;
			if (onLevelSubscribe) {
				onLevelSubscribe();
			}
		});
	}

	o_level: KnockoutObservable<number>;

	static empty = (): MemberShip => {
		return new MemberShip("", "", "", 0, "");
	}

}
