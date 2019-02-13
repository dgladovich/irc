const { Router } = require('express');

const router = Router();
const db = reqm('db');

const { ErrorCode } = db;

router.get('/', (req, res, next) => {
  ErrorCode.findAll().then((errors) => {
    res.json(errors);
  });
});

module.exports = router;
