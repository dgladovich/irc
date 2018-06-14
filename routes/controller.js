'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');
const {Controller} = db;

router.get('/', function (req, res, next) {
    Controller
        .findById(context.controller)
        .then((ctrl) => {
            res.json(ctrl);
        })
        .catch((err)=>{res.status(500).send(err)})
});

module.exports = router;
