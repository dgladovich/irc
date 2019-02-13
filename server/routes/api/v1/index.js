const { Router } = require('express');
const errors = require('./errors');
const journal = require('./journal');
const svc = require('./svc');
const testing = require('./testing');
const controller = require('./controller');
const devices = require('./devices');
const statuses = require('./statuses');
const analitics = require('./analitics');
const values = require('./values');
const login = require('./login');
const config = require('./config');
const bot = require('./bot.js');

const router = Router();

router.use('/controller', controller);
router.use('/journal', journal);
router.use('/testing', testing);
router.use('/devices', devices);
router.use('/statuses', statuses);
router.use('/analitics', analitics);
router.use('/svc', svc);
router.use('/login', login);
router.use('/errors', errors);
router.use('/values', values);
router.use('/config', config);
router.use('/bot', bot);

module.exports = router;
