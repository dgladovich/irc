'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Informer } = db;


router.get('/', function(req, res, next) {
    Informer.findAll().then((informs)=>{
        res.json(informs);
    }).catch((err)=>{
        res.json({
            errors: err
        })
    })
});


module.exports = router;
