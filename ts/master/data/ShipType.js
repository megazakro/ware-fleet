var ShipTypes = (function () {
    function ShipTypes() {
    }
    ShipTypes.BB = "01";

    ShipTypes.BBV = "02";

    ShipTypes.CV = "03";

    ShipTypes.ACV = "04";

    ShipTypes.CVL = "05";

    ShipTypes.AV = "06";

    ShipTypes.CA = "07";

    ShipTypes.CAV = "08";

    ShipTypes.CL = "09";

    ShipTypes.DD = "10";
    return ShipTypes;
})();

var ShipType = (function () {
    function ShipType(id, name, shortName) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.selected = ko.observable(true);
    }
    return ShipType;
})();
