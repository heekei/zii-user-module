"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./Modules/User"));
exports.User = User_1.default;
const Database_1 = __importDefault(require("./Modules/Database"));
const config_1 = __importDefault(require("./config/config"));
/**
 *
 *
 * @param {MongoClient} mClient
 * @param {string} [collection='users']
 * @returns
 */
function getCollection(mClient, collection = 'users') {
    return mClient.db(config_1.default.dbName).collection(collection);
}
/**
 * 登录校验
 *
 * @param {string} username
 * @param {string} password
 * @returns
 */
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const mclt = yield Database_1.default.doInDbConn();
        const conn = getCollection(mclt, 'users');
        try {
            let isValid = yield conn.find({ username, password }).toArray();
            console.log('isValid: ', isValid);
            return !!isValid.length;
        }
        catch (error) {
            return error;
        }
        finally {
            mclt.close();
        }
    });
}
exports.login = login;
/**
 * 添加用户
 *
 * @param {(User | User[])} user
 * @returns
 */
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const mclt = yield Database_1.default.doInDbConn();
        const conn = getCollection(mclt, 'users');
        let uidLock = yield conn.createIndex('userName', { unique: true });
        try {
            let result = yield conn.insertMany(Array.isArray(user) ? user : [user]);
            return result;
        }
        catch (error) {
            let err = error;
            return err;
        }
        finally {
            mclt.close();
        }
    });
}
exports.addUser = addUser;
//# sourceMappingURL=index.js.map