'use strict';

const express = require('express');

const router = express.Router();
const db = require('../db');

const { ErrorCode } = db;


router.get('/', (req, res, next) => {
  ErrorCode.findAll().then((errors) => {
    res.json(errors);
  });
});

module.exports = router;