'use strict';

const express = require('express');

const router = express.Router();
const db = require('../../../db');

/* GET home page. */
router
	//= ===================================
	//  	GET ALL
	//= ===================================
	.get('/', (req, res, next) => {
		Alarms.findAll().then((alarms) => {
			res.send(alarms);
		});
	})
	//= ===================================
	//  	GET BY ID
	//= ===================================
	.get('/range', (req, res, next) => {
		const where = {};
		const order = ['id', 'ASC'];
		order[0] = req.query.order === 'time' ? 'date' : 'date';
		order[1] = req.query.orderDirection;


		+req.query.messageType !== 0 ? where.type = +req.query.messageType : null;
		+req.query.messageCode !== 0 ? where.code = +req.query.messageCode : null;

		const whereDate = {
			[Op.and]: [
				{
					date: {
						[Op.gte]: req.query.start,
					},
				},
				{
					date: {
						[Op.lte]: req.query.end,
					},
				},
			],
		};
		History
			.findAll({
				where: Object.assign(where, whereDate),
				order: [order],

			})
			.then((events) => {
				res.send(events);
			});
	})
	.get('/:id', (req, res, next) => {
		History.findAll({ where: { dev: req.params.id } }).then((history) => {
			res.send(history);
		});
	})
	//= ===================================
	//  	SEND BY ID
	//= ===================================
	.post('/', (req, res, next) => {
	//	History.create({		});
		res.send(req.body);
	})
	.post('/:id', (req, res, next) => {
		History.create(req.body).then((work) => {
			res.send(work);
/*			History.findAll({ where: { to_id: req.params.id } }).then((history)=>{
				res.send(history);
			}); */
		});

		History.create(req.body).then((history) => {
			const promises = [];
			DeviceServiceWork.findAll({ where: { service_id: req.params.id } }).then((deviceServiceWorks) => {
				deviceServiceWorks.map((deviceServicWork) => {
					promises.push(DeviceServiceWorkTMC.create({ item_id: history.get('id') }).then());
				});
			});
			Promise.all(promises).then(() => {
				res.send(history);
			});

/*			History.findAll({ where: { to_id: req.params.id } }).then((works)=>{
				res.send(works);
			}); */
		});
	})
	//= ===================================
	//  	INSERT/UPDATE BY ID
	//= ===================================
	.put('/:id', (req, res, next) => {
		res.send(`i am putting all tests stuff:${req.params.id}`);
	})
	//= ===================================
	//  	DELETE BY ID
	//= ===================================
	.delete('/:id', (req, res, next) => {
		res.send('i am deleting all tests stuff');
	});

module.exports = router;
