// import db from './Database';
// import config from '../config/config';
class User {
    // id: number = 0;
    userName!: string;
    age?: number;
    gender?: '男' | '女';
}
// db.doInDbConn().then((res) => {
//     var conn = res.db(config.dbName).collection('users');
//     conn.insert
//     res.close();
// }, (err) => {
//     console.log('err: ', err);
// });
// var u = new User({
//     id: 1,
//     name: '123'
// });

export default User;