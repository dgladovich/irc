'use strict';

const express = require('express');

const router = express.Router();
const db = require('../db');

router.get('/seed_alarms', (req, res) => {
    const alarms = [];
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
        res.json({ success: true });
    });
});
module.exports = router;
