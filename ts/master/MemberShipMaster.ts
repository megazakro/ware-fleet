
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="./ShipMaster.ts"/>

module MemberShipMaster {

	var memberSeq: number;

	var onLevelSubscribe: () => void;

	export var list: KnockoutObservableArray<MemberShip>;

	export var map: { [key: string]: MemberShip };

	export function initialize(_onLevelSubscribe: () => void): JQueryPromise<{}> {

		onLevelSubscribe = _onLevelSubscribe;
		map = {};

		return jQuery.Deferred((dfd) => {

			if (localStorage[LS_KEY.FINAL_FLEET_SEQ]) {
				memberSeq = parseInt(localStorage[LS_KEY.FINAL_MEMBER_SEQ]);
				if (isNaN(memberSeq)) {
					memberSeq = 0;
				}
			}
			else {
				memberSeq = 0;
			}

			var _list: Array<MemberShip> = [];
			if (localStorage[LS_KEY.MEMBER_SHIPS]) {

				var value: Array<any> = JSON.parse(localStorage[LS_KEY.MEMBER_SHIPS]);

				if (value && 0 < value.length) {

					value.forEach((item: MemberShipsItem) => {
						var member = new MemberShip(item.shipId, item.name, item.type, item.level, item.memberId, onLevelSubscribe);
						_list.push(member);
						map[member.memberId] = member;
					});
				}
			}

			list = ko.observableArray(_list);

			dfd.resolve();
		}).promise();
	}

	export function getMember(memberId: string): MemberShip {

		if (memberId in map) {
			return map[memberId];
		}

		return MemberShip.empty();
	}

	export function insert(shipId: string, name: string, type: string, level: number) : MemberShip {

		var member = new MemberShip(shipId, name, type, level, String(memberSeq++), onLevelSubscribe);

		list.push(member);

		return member;
	}

	export function remove(memberShip : MemberShip) {
		list.remove(memberShip);
	}

	export function saveToStorage() {

		localStorage[LS_KEY.FINAL_MEMBER_SEQ] = memberSeq;
		localStorage[LS_KEY.MEMBER_SHIPS] = JSON.stringify(list());

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
