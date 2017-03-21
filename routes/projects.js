/**
 * Created by EmmaWu on 2017/3/20.
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with projects');
});

router.post('/', (req, res) => {

});

module.exports = router;
