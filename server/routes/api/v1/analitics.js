'use strict';

const express = require('express');

const router = express.Router();
const db = require('../db');

const { Informer } = db;


router.get('/', (req, res, next) => {
    Informer.findAll().then((informs) => {
        res.json(informs);
    }).catch((err) => {
        res.json({
            errors: err,
        });
    });
});


module.exports = router;
