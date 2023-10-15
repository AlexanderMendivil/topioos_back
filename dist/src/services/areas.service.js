"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.deleteArea = exports.updateArea = exports.addArea = exports.getOneArea = exports.getAreas = void 0;
const connection_1 = require("../../DBConnection/connection");
const area_interface_1 = require("../interfaces/area.interface");
const getAreas = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const connect = yield ((_a = (0, connection_1.connection)()) === null || _a === void 0 ? void 0 : _a.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('areas');
    const guests = yield (collection === null || collection === void 0 ? void 0 : collection.find({}).toArray());
    connect === null || connect === void 0 ? void 0 : connect.close();
    return guests;
});
exports.getAreas = getAreas;
const getOneArea = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const connect = yield ((_b = (0, connection_1.connection)()) === null || _b === void 0 ? void 0 : _b.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('areas');
    const guest = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ id }));
    connect === null || connect === void 0 ? void 0 : connect.close();
    return guest;
});
exports.getOneArea = getOneArea;
const addArea = (area) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const connect = yield ((_c = (0, connection_1.connection)()) === null || _c === void 0 ? void 0 : _c.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('areas');
    const insertedArea = yield (collection === null || collection === void 0 ? void 0 : collection.insertOne(area));
    connect === null || connect === void 0 ? void 0 : connect.close();
    return insertedArea;
});
exports.addArea = addArea;
const updateArea = (area) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const connect = yield ((_d = (0, connection_1.connection)()) === null || _d === void 0 ? void 0 : _d.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('areas');
    const update = { $set: area };
    const updatedArea = yield (collection === null || collection === void 0 ? void 0 : collection.updateOne({ id: area.id }, update));
    connect === null || connect === void 0 ? void 0 : connect.close();
    return updatedArea;
});
exports.updateArea = updateArea;
const deleteArea = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const connect = yield ((_e = (0, connection_1.connection)()) === null || _e === void 0 ? void 0 : _e.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('areas');
    yield (collection === null || collection === void 0 ? void 0 : collection.deleteMany({ id: { $in: ids } }));
    connect === null || connect === void 0 ? void 0 : connect.close();
});
exports.deleteArea = deleteArea;
const changeStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const connect = yield ((_f = (0, connection_1.connection)()) === null || _f === void 0 ? void 0 : _f.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('areas');
    const area = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ id: id }));
    if (area) {
        let update;
        if (status === area_interface_1.Status.maintenance) {
            update = { $set: Object.assign(Object.assign({}, area), { status, last_maintenance: Date() }) };
        }
        else {
            update = { $set: Object.assign(Object.assign({}, area), { status }) };
        }
        const updatedArea = yield (collection === null || collection === void 0 ? void 0 : collection.updateOne({ id: area.id }, update));
        connect === null || connect === void 0 ? void 0 : connect.close();
        return updatedArea;
    }
});
exports.changeStatus = changeStatus;
//# sourceMappingURL=areas.service.js.map