'use strict';

var express = require('express');
var router = express.Router();
const db = require('../models');
const bot = require('../informer.js');

/* GET home page. */
router
	//====================================
	//  	GET ALL
	//====================================
	.get('/', function(req, res, next) {
		bot.init('smart.db', 1, (info) => {
			res.send(info);
		});
	});

module.exports = router;
