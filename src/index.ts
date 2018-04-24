import User from './Modules/User';
import db from './Modules/Database';
import config from './config/config';
import { MongoClient } from 'mongodb'
/**
 * 
 * 
 * @param {MongoClient} mClient 
 * @param {string} [collection='users'] 
 * @returns 
 */
function getCollection(mClient: MongoClient, collection: string = 'users') {
    return mClient.db(config.dbName).collection(collection)
}

/**
 * 登录校验
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function login(username: string, password: string) {
    return await db.doInDbConn().then(async (mclt) => {
        let conn = getCollection(mclt, 'users');
        let isValid = await conn.find({ username: username, password: password }).toArray();
        mclt.close();
        return !!isValid.length;
    }, async (err) => await err);
}

/**
 * 添加用户
 * 
 * @param {(User | User[])} user 
 * @returns 
 */
async function addUser(user: User | User[]) {
    return await db.doInDbConn().then(async (mclt) => {
        let conn = getCollection(mclt, 'users');
        conn.createIndex('username');
        let result = await conn.insertMany(Array.isArray(user) ? user : [user]);
        mclt.close();
        return result;
    }, async (err) => await err);
}

// class CustomUser implements User {
//     username!: string;
// }
// var xm: CustomUser = { username: '庄希琦' };
export { login, User, addUser };