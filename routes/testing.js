'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/seed_alarms', function (req, res) {
    let alarms = [];
    for (let i = 0; i < 50; i++) {
        alarms.push({
            ctrl: 2,
            dev: faker.random.number(),
            typ: faker.random.number(),
            par: faker.random.number(),
            num: faker.random.number(),
            dat: moment(faker.date.past()).format(),
        });
    }
    Alarms.bulkCreate(alarms).then(() => {
        res.json({success: true});
    })

});
module.exports = router;
