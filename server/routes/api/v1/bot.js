const express = require('express');

const router = express.Router();
const db = reqm('db');
const bot = reqm('informer.js');

/* GET home page. */
router
  .get('/', (req, res, next) => {
    bot.init('smart.db', 1, (info) => {
      res.send(info);
    });
  });

module.exports = router;
