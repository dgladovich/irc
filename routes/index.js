'use strict';

const express = require('express');
const _ = require('underscore');

const router = express.Router();
const path = require('path');
const to = require('./to');
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
const passport = require('../middleware/passport');
const bot = require('./bot.js');


/* GET home page. */
/*router.use((req, res, next)=>{

});*/
router
    .get('/', function (req, res, next) {
        if (/*req.session.token === undefined*/ false  ) {
            res.redirect('/login');
        } else {
            //res.sendFile(path.resolve('public', 'main.html'));
            res.sendFile(path.resolve('dist', 'index.html'));
        }
    })
router.use('/to', to);
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
