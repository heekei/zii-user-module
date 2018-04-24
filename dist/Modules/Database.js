"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config/config"));
function doInDbConn(callback) {
    if (callback) {
        return mongodb_1.MongoClient.connect(config_1.default.dbUri, callback);
    }
    else {
        return mongodb_1.MongoClient.connect(config_1.default.dbUri);
    }
}
// export default {
//     doInDbConn: function (callback: MongoCallback<MongoClient>) {
//         return MongoClient.connect(config.dbUri, callback);
//     },
//     doInDbConnPromise: function () {
//         return MongoClient.connect(config.dbUri);
//     }
// }
exports.default = { doInDbConn };
//# sourceMappingURL=Database.js.map