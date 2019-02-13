const { Router } = require('express');

const db = reqm('db');
const router = Router();

const { Controller } = db;

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
