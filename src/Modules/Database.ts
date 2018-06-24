import { MongoClient, MongoCallback, MongoError, CursorResult } from 'mongodb';
import config from '../config/config';
// const MongoClient = mongodb.MongoClient;

// var mongodbServer = new mongodb.Server(config.dbHost, config.dbPort);
// var db = new mongodb.Db(config.dbName, mongodbServer);


/**
 * 连接MongoDB,并在该连接中操作数据库
 * 
 * @param {Function?} callback 回调
 */
function doInDbConn(callback: MongoCallback<MongoClient>): void;
function doInDbConn(): Promise<MongoClient>;
function doInDbConn(callback?: MongoCallback<MongoClient>) {
    if (callback) {
        return MongoClient.connect(config.dbUri, callback);
    } else {
        return MongoClient.connect(config.dbUri);
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
export default { doInDbConn };