/**
 * Created by EmmaWu on 2017/3/20.
 */

const express = require('express');
const router = express.Router();

const User = require('../lib/user.domain');

router.get('/', (req, res) => {
    res.send('respond with login');
});

router.post('/', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let user = {
        name,
        password
    };

    User.login(user)
        .then(data => {
            res.send(data);
        });

    // console.log(`${name} ${password}` );
    // res.send('respond with login');
});

module.exports = router;
