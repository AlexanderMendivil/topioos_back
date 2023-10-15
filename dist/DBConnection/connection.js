"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongodb_1 = require("mongodb");
const connection = () => {
    let client;
    try {
        const uri = process.env.MONGO_URL;
        client = new mongodb_1.MongoClient(uri, {
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
exports.connection = connection;
//# sourceMappingURL=connection.js.map