
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>

module ShipMaster {

	export var list: Array<Ship>;

	export var map: { [key: string]: Ship };

	export function initialize(): JQueryPromise<{}> {

		list = [];

		return jQuery.Deferred((dfd) => {

			list = allShips();

			dfd.resolve();

		}).promise();
	}

}

