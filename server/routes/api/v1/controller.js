'use strict';

const express = require('express');

const router = express.Router();
const db = require('../db');

const {
  Controller,
} = db;

router.get('/', (req, res, next) => {
  Controller
    .findById(context.controller)
    .then((ctrl) => {
      res.json(ctrl);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
