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

    ShipTypes.CLT = "10";

    ShipTypes.DD = "11";

    ShipTypes.SS = "12";

    ShipTypes.SSV = "13";

    ShipTypes.LHA = "14";

    ShipTypes.AR = "15";

    ShipTypes.AS = "16";
    return ShipTypes;
})();

var ShipType = (function () {
    function ShipType(id, name, shortName, _selected) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.selected = ko.observable(_selected);
    }
    return ShipType;
})();
