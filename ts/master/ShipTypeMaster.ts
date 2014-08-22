
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>

module ShipTypeMaster {

	export var list: Array<ShipType>;

	export var map: { [key: string]: ShipType };

	export function initialize(): JQueryPromise<{}> {

		var selectedDefault = true;

		return jQuery.Deferred((dfd) => {

			list = [
				new ShipType("01", "戦艦", "戦"),
				new ShipType("02", "航空戦艦", "航戦"),
				new ShipType("03", "正規空母", "航"),
				new ShipType("04", "装甲空母", "装母"),
				new ShipType("05", "軽空母", "軽母"),
				new ShipType("06", "水上機母艦", "水母"),
				new ShipType("07", "重巡洋艦", "重巡"),
				new ShipType("08", "航空巡洋艦", "航巡"),
				new ShipType("09", "軽巡洋艦", "軽巡"),
				new ShipType("10", "駆逐艦", "駆")

			];

			map = {};
			list.forEach((value) => {
				map[value.id] = value;
			});

			dfd.resolve();
		}).promise();
	}

}

class ShipType {
	constructor(
		public id: string,
		public name: string,
		public shortName: string) {

		this.selected = ko.observable(true);
	}

	selected: KnockoutObservable<boolean>
}
