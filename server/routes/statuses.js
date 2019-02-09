const express = require('express');
const router = express.Router();
const db = require('../models');
const {
    ValueStatuses,
    Language
} = db;

router.get('/', function (req, res, next) {
    ValueStatuses
        .findAll({
            include: [
                {
                    models: Language,
                    as: 'translate'
                }
            ]
        })
        .then(statuses => {
            res.json({
                data: {
                    statuses: statuses
                }
            });
        })
        .catch((err) => {
            console.log(err)
            res.json({
                errors: {
                    code: err
                }
            })
        })
});

module.exports = router;
