
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>

module ShipMaster {

	export var list: Array<Ship>;

	export var map: { [key: string]: Ship };

	export function initialize(): JQueryPromise<{}> {

		list = [];

		return jQuery.Deferred((dfd) => {

			jQuery.ajax({
				url: "./json/myship.json",
				dataType: "JSON"
			})
				.then((data) => {

					data.ships.forEach((value) => {
						list.push(new Ship(value.id, value.name, value.type, 1));
					});

				})
				.done(() => {
					dfd.resolve();
				});

		}).promise();
	}

}

class Ship {
	constructor(
		public shipId: string,
		public name: string,
		public type: string,
		public level: number
		) {

	}
}
