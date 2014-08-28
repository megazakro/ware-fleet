
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>

module ShipTypeMaster {

	export var list: Array<ShipType>;

	export var map: { [key: string]: ShipType };

	export function initialize(): JQueryPromise<{}> {

		var selectedDefault = true;

		return jQuery.Deferred((dfd) => {

			list = [
				new ShipType(ShipTypes.BB, "戦艦", "戦"),
				new ShipType(ShipTypes.BBV, "航空戦艦", "航戦"),
				new ShipType(ShipTypes.CV, "正規空母", "航"),
				new ShipType(ShipTypes.ACV, "装甲空母", "装母"),
				new ShipType(ShipTypes.CL, "軽空母", "軽母"),
				new ShipType(ShipTypes.AV, "水上機母艦", "水母"),
				new ShipType(ShipTypes.CA, "重巡洋艦", "重巡"),
				new ShipType(ShipTypes.CAV, "航空巡洋艦", "航巡"),
				new ShipType(ShipTypes.CL, "軽巡洋艦", "軽巡"),
				new ShipType(ShipTypes.DD, "駆逐艦", "駆")

			];

			map = {};
			list.forEach((value) => {
				map[value.id] = value;
			});

			dfd.resolve();
		}).promise();
	}

}
