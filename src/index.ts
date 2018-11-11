import User from './Modules/User';
import db from './Modules/Database';
import config from './config/config';
import { MongoClient, InsertWriteOpResult, MongoError } from 'mongodb'
/**
 * 
 * 
 * @param {MongoClient} mClient 
 * @param {string} [collection='users'] 
 * @returns 
 */
function getCollection(mClient: MongoClient, collection: string = 'users') {
    return mClient.db(config.dbName).collection(collection);
}

/**
 * 登录校验
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function login(username: string, password: string) {
    const mclt = await db.doInDbConn();
    const conn = getCollection(mclt, 'users');
    try {
        let isValid = await conn.find({ username, password }).toArray();
        console.log('isValid: ', isValid);
        return !!isValid.length;
    }
    catch (error) {
        return error;
    }
    finally {
        mclt.close();
    }
}

/**
 * 添加用户
 * 
 * @param {(User | User[])} user 
 * @returns 
 */
async function addUser(user: User | User[]) {
    const mclt = await db.doInDbConn();
    const conn = getCollection(mclt, 'users');
    let uidLock = await conn.createIndex('userName', { unique: true });
    try {
        let result: InsertWriteOpResult = await conn.insertMany(Array.isArray(user) ? user : [user]);
        return result;
    }
    catch (error) {
        let err: MongoError = error;
        return err;
    }
    finally {
        mclt.close();
    }
}



// class CustomUser implements User {
//     username!: string;
// }
// var xm: CustomUser = { username: '庄希琦' };
export { login, User, addUser };