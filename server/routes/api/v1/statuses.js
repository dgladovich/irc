const express = require('express');

const router = express.Router();
const db = require('../db');

const {
    ValueStatuses,
    Language,
} = db;

router.get('/', (req, res, next) => {
    ValueStatuses
        .findAll({
            include: [
                {
                    models: Language,
                    as: 'translate',
                },
            ],
        })
        .then((statuses) => {
            res.json({
                data: {
                    statuses,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                errors: {
                    code: err,
                },
            });
        });
});

module.exports = router;
