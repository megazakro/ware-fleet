
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="./data/ShipType.ts"/>

module ShipTypeMaster {

	export var list: Array<ShipType>;

	export var map: { [key: string]: ShipType };

	export function initialize(): JQueryPromise<{}> {

		var selectedDefault = false;

		return jQuery.Deferred((dfd) => {

			list = [
				new ShipType(ShipTypes.BB, "戦艦", "戦", selectedDefault),
				new ShipType(ShipTypes.BBV, "航空戦艦", "航戦", selectedDefault),
				new ShipType(ShipTypes.CV, "正規空母", "航", selectedDefault),
				new ShipType(ShipTypes.ACV, "装甲空母", "装母", selectedDefault),
				new ShipType(ShipTypes.CVL, "軽空母", "軽母", selectedDefault),
				new ShipType(ShipTypes.AV, "水上機母艦", "水母", selectedDefault),
				new ShipType(ShipTypes.CA, "重巡洋艦", "重巡", selectedDefault),
				new ShipType(ShipTypes.CAV, "航空巡洋艦", "航巡", selectedDefault),
				new ShipType(ShipTypes.CL, "軽巡洋艦", "軽巡", selectedDefault),
				new ShipType(ShipTypes.CLT, "重雷装巡洋艦", "雷巡", selectedDefault),
				new ShipType(ShipTypes.DD, "駆逐艦", "駆", selectedDefault),
				new ShipType(ShipTypes.SS, "潜水艦", "潜", selectedDefault),
				new ShipType(ShipTypes.SSV, "潜水空母", "潜母", selectedDefault),
				new ShipType(ShipTypes.LHA, "揚陸艦", "揚陸", selectedDefault),
				new ShipType(ShipTypes.AR, "工作艦", "工", selectedDefault),
				new ShipType(ShipTypes.AS, "潜水母艦", "潜母艦", selectedDefault)
			];

			map = {};
			list.forEach((value) => {
				map[value.id] = value;
			});

			dfd.resolve();
		}).promise();
	}

}
