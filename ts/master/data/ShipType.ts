
class ShipTypes {

	/** 戦艦 */
	static BB = "01";

	/** 航空戦艦 */
	static BBV = "02";

	/** 正規空母 */
	static CV = "03";

	/** 装甲空母 */
	static ACV = "04";

	/** 軽空母 */
	static CVL = "05";

	/** 水上機母艦 */
	static AV = "06";

	/** 重巡洋艦 */
	static CA = "07";

	/** 航空巡洋艦 */
	static CAV = "08";

	/** 軽巡洋艦 */
	static CL = "09";

	/** 駆逐艦 */
	static DD = "10";
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
