
class LS_KEY {
	static ALLSHIP_TOGGLE_IS_CLOSE: string = "ALLSHIP_TOGGLE_IS_CLOSE";
	static MEMBER_SHIPS: string = "MEMBER_SHIPS";
	static ACTIVE_SHIP_ID = "ACTIVE_SHIP_ID";
	static ACTIVE_FLEET_ID = "ACTIVE_FLEET_ID";
	static FINAL_FLEET_SEQ = "FINAL_FLEET_SEQ";
	static FINAL_MEMBER_SEQ = "FINAL_MEMBER_SEQ";
	static FLEETS = "FLEETS";
}

class MemberShipsItem {
	shipId: string;
	name: string;
	type: string;
	level: number;
	memberId: string;
}

class FleetsItem {
	fleetId: string;
	name: string;
	memberIds: Array<string>;
}
