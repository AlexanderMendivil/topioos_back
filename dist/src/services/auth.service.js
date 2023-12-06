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
exports.login = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const connectionAuth_1 = require("../../DBConnection/connectionAuth");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const connect = yield ((_a = (0, connectionAuth_1.connectionAuth)()) === null || _a === void 0 ? void 0 : _a.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('users');
    const existingUser = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ email: req.body.email }));
    if (existingUser) {
        connect === null || connect === void 0 ? void 0 : connect.close();
        return res.status(409).json({ message: 'User already exists' });
    }
    bcrypt_1.default.hash(req.body.password, 10, (err, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err) {
                connect === null || connect === void 0 ? void 0 : connect.close();
                return res.status(500).json({ message: 'Error hashing password' });
            }
            const newUser = {
                email: req.body.email,
                password: hashedPassword,
            };
            const token = jsonwebtoken_1.default.sign({ username: newUser.email }, process.env.SECRET_KEY, { expiresIn: '30d' });
            const finalUser = {
                email: req.body.email,
                password: hashedPassword,
                jwt: `${token}`
            };
            yield (collection === null || collection === void 0 ? void 0 : collection.insertOne(finalUser));
            connect === null || connect === void 0 ? void 0 : connect.close();
            return res.status(201).json({ finalUser });
        }
        catch (e) {
            connect === null || connect === void 0 ? void 0 : connect.close();
            return res.status(500).json({ message: 'Server error' });
        }
    }));
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const connect = yield ((_b = (0, connectionAuth_1.connectionAuth)()) === null || _b === void 0 ? void 0 : _b.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db(process.env.COLLECTION).collection('users');
    const existingUser = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ email: req.body.email }));
    if (!existingUser) {
        connect === null || connect === void 0 ? void 0 : connect.close();
        return res.status(404).json({ message: 'User not found' });
    }
    bcrypt_1.default.compare(req.body.password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password, (err, result) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        if (result) {
            const token = jsonwebtoken_1.default.sign({ username: existingUser === null || existingUser === void 0 ? void 0 : existingUser.username, id: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id }, process.env.SECRET_KEY, { expiresIn: '30d' });
            connect === null || connect === void 0 ? void 0 : connect.close();
            return res.status(200).json({ token, user: req.body });
        }
        connect === null || connect === void 0 ? void 0 : connect.close();
        return res.status(401).json({ message: 'Authentication failed' });
    });
});
exports.login = login;
//# sourceMappingURL=auth.service.js.map