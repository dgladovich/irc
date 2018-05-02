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
const login = require('./login');
const config = require('./config');
const passport = require('../middleware/passport');


/* GET home page. */
router
    .get('/', function (req, res, next) {
        if (/*req.user === undefined*/ false) {
            res.redirect('/auth')
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
router.use('/config', config);



module.exports = router;
