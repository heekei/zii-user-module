'use strict';
const userManagement = require('./dist/index');

var u = new userManagement.User({
    username: '123',
    password: '123'
});
userManagement.login('庄希琦', 'password2').then((res) => {
    console.log('loginRes: ', res);
}, (err) => {
    console.log('loginRrr: ', err);
});
userManagement.addUser({
    username: '庄希琦',
    password: 'password'
}).then((res) => {
    console.log('addUserRes: ', res);
}, (err) => {
    console.log('addUserRes: ', err);
});