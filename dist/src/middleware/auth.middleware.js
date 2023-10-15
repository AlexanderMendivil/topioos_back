"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({ message: "You are not allow here" });
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return res.status(403).json({ message: "Unathorized" });
        next();
    });
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.middleware.js.map