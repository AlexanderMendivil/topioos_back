"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionAuth = void 0;
const mongodb_1 = require("mongodb");
const connectionAuth = () => {
    try {
        const uri = process.env.MONGO_URL;
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        });
        return client;
    }
    catch (e) {
        console.log(e);
    }
};
exports.connectionAuth = connectionAuth;
//# sourceMappingURL=connectionAuth.js.map