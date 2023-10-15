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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const areas_service_1 = require("./services/areas.service");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/area', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const areas = yield (0, areas_service_1.getAreas)();
    res.send(areas);
}));
app.post('/area', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, areas_service_1.addArea)(req.body);
    res.send(result);
}));
app.put('/area', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const area = req.body;
    const result = yield (0, areas_service_1.updateArea)(area);
    res.send(result);
}));
app.delete('/area', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body;
    const result = yield (0, areas_service_1.deleteArea)(ids);
    res.send(result);
}));
app.put('/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    const result = yield (0, areas_service_1.changeStatus)(id, status);
    res.send(result);
}));
app.post('/OneArea', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const area = yield (0, areas_service_1.getOneArea)(req.body.id);
    res.send(area);
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Express is listening at http://localhost:${port}`);
}));
//# sourceMappingURL=app.js.map