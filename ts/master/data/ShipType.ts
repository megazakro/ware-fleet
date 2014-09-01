
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

	/** 雷巡 */
	static CLT = "10";

	/** 駆逐艦 */
	static DD = "11";

	/** 潜水艦 */
	static SS = "12";

	/** 潜水空母 */
	static SSV = "13";

	/** 揚陸艦 */
	static LHA = "14";

	/** 工作艦 */
	static AR = "15";

	/** 潜水母艦 */
	static AS = "16";
}

class ShipType {
	constructor(
		public id: string,
		public name: string,
		public shortName: string,
		_selected: boolean) {

		this.selected = ko.observable(_selected);
	}

	selected: KnockoutObservable<boolean>
}
