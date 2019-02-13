const { Router } = require('express');

const router = Router();
const base = require('./base');
const apiV1 = require('./api/v1');

router.get('/', base);
router.use('/api/v1', apiV1);

module.exports = router;
