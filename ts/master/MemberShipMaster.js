﻿/// <reference path="../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts"/>
/// <reference path="./ShipMaster.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemberShipMaster;
(function (MemberShipMaster) {
    var memberSeq;

    var onLevelSubscribe;

    MemberShipMaster.list;

    MemberShipMaster.map;

    function initialize(_onLevelSubscribe) {
        onLevelSubscribe = _onLevelSubscribe;

        return jQuery.Deferred(function (dfd) {
            if (localStorage[LS_KEY.FINAL_FLEET_SEQ]) {
                memberSeq = parseInt(localStorage[LS_KEY.FINAL_MEMBER_SEQ]);
            } else {
                memberSeq = 0;
            }

            var _list = [];
            if (localStorage[LS_KEY.MEMBER]) {
                var value = JSON.parse(localStorage[LS_KEY.MEMBER]);

                if (value && 0 < value.length) {
                    value.forEach(function (item) {
                        _list.push(new MemberShip(item.shipId, item.name, item.type, item.level, item.memberId, onLevelSubscribe));
                    });
                }
            }

            MemberShipMaster.list = ko.observableArray(_list);

            dfd.resolve();
        }).promise();
    }
    MemberShipMaster.initialize = initialize;

    function insert(shipId, name, type, level) {
        var member = new MemberShip(shipId, name, type, level, String(memberSeq++), onLevelSubscribe);

        MemberShipMaster.list.push(member);

        return member;
    }
    MemberShipMaster.insert = insert;

    function remove(memberShip) {
        MemberShipMaster.list.remove(memberShip);
    }
    MemberShipMaster.remove = remove;
})(MemberShipMaster || (MemberShipMaster = {}));

var MemberShip = (function (_super) {
    __extends(MemberShip, _super);
    function MemberShip(shipId, name, type, level, memberId, onLevelSubscribe) {
        var _this = this;
        _super.call(this, shipId, name, type, level);
        this.shipId = shipId;
        this.name = name;
        this.type = type;
        this.level = level;
        this.memberId = memberId;

        if (0 < level) {
            this.o_level = ko.observable(level);
        } else {
            this.o_level = ko.observable(0);
        }

        this.o_level.subscribe(function (value) {
            _this.level = value;
            if (onLevelSubscribe) {
                onLevelSubscribe();
            }
        });
    }
    MemberShip.empty = function () {
        return new MemberShip("", "", "", 0, "");
    };
    return MemberShip;
})(Ship);
