'use strict';
const userManagement = require('./dist/index');

var u = new userManagement.User({
    username: '123',
    password: '123'
});
userManagement.login('庄希琦', 'password2').then((res) => {
    console.log('loginRes: ', res);
});

userManagement.addUser({
    userName: '庄希琦',
    password: 'password',
    telephone:'15308191918'
}).then((res) => {
    console.log('addUserRes: ',/*  res.message || */ res);
});