/**
 * Created by EmmaWu on 2017/3/21.
 */

const mongojs = require('mongojs');
let db;

module.exports = {
    connect,
    findOne,
    add,
    insert
};

function connect() {
    db = mongojs('mongodb://localhost/myApp');

    db.on('error', function (err) {
        console.log('database error', err)
    });

    db.on('connect', function () {
        console.log('database connected');
    });

    return db;
}

function insert(collection, data) {
    return new Promise((resolve, reject) => {
        db[collection].insert(data, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
}

function add() {

}

function findOne(collection, query) {
    return new Promise((resolve, reject) => {
        db[collection].findOne(query, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        });
    });

}


