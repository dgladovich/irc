const { Router } = require('express');

const db = reqm('db');
const router = Router();

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
