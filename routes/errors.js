'use strict';
var express = require('express');
var router = express.Router();
const db = require('../models');
const {ErrorCode} = db;


router.get('/', function(req, res, next) {
  ErrorCode.findAll().then((errors)=>{
    res.json(errors);
  })
});

module.exports = router;
