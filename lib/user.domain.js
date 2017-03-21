/**
 * Created by EmmaWu on 2017/3/21.
 */

const mongojs = require('../service/mongo');

module.exports = {
    login,
    addUser,
    getUsers,
    getUser,
    removeUser
};

const _ = require('lodash');
const crypto = require('crypto');

function login(user) {
    return getUser(user)
        .then(data => {
            if (data) {
                return _.pick(data, ['_id', 'name']);
            } else {
                return addUser(user);
            }
        });
}

function addUser(user) {
    let newUser = {
        name: user.name,
        password: hashPwd(user.password)
    };
    return mongojs.insert('users', newUser)
        .then(data =>  {
            return _.pick(data, ['_id', 'name']);
        });
}

function getUsers() {
    // return users;
}

function getUser(user) {
    let query = {name: user.name, password: hashPwd(user.password)};
    return mongojs.findOne('users', {query})
        .then(data => {
            if (!data) return data;
            return _.pick(data, ['_id', 'name']);
        });
}

function removeUser() {
    
}

function hashPwd(password) {
    let shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    return shaSum.digest('hex');
}
