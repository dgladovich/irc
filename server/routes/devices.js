'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const context = require('../config/config.json');
const db = require('../models');
const env = process.env.NODE_ENV;
const {
    Alarm,
    Device,
    DeviceCamera,
    ViewGroup,
    ControllerFace,
    ValueMeasurment,
    Language,
    DeviceGroup,
    PassportData,
    PickingList,
    PickingListOpt,
    DeviceService,
    DeviceServiceWork,
    Work,
    WorkMaterial,
    Material,
    Type
} = db;

/* GET home page. */
router
//====================================
//      GET ALL
//====================================
    .get('/', function (req, res, next) {
        Device.findAll({
            where: {ctrl: context[env].controller, active: 1},
            include: [
                /*                {
                 model: DeviceCamera,
                 as: 'cameras'
                 },*/
                {
                    model: ControllerFace,
                    as: 'faces',
                    include: [{
                        model: ValueMeasurment,
                        as: 'measure',
                        include: [{
                            model: Language,
                            as: 'translate'
                        }]
                    }]

                },
                {
                    model: DeviceGroup,
                    as: 'devicegroup',
                },
                {
                    model: PassportData,
                    as: 'passportdata',
                },
                {
                    model: PickingList,
                    as: 'pickinglist',
                    include: [{
                        model: PickingListOpt,
                        as: 'opts'
                    }]
                },
                {
                    model: DeviceService,
                    as: 'service',
                    order: [['ser_num', 'ASC']],
                    include: [
                        {
                            model: DeviceServiceWork,
                            as: 'service_work',
                            include: [
                                {
                                    model: Work,
                                    as: 'works',
                                    include: [{
                                        model: WorkMaterial,
                                        as: 'materials',
                                        include: [{
                                            model: Material,
                                            as: 'mat'
                                        }]
                                    }]
                                },
                                {
                                    model: Type,
                                    as: 'devicetype',
                                    include: [{
                                        model: Language,
                                        as: 'translate'
                                    }]
                                },
                                {
                                    model: Device,
                                    as: 'controller'
                                }
                            ]
                        }
                    ]
                }]
        }).then((devices) => {
            res.send(devices);
        }).catch(err => {
            res.send({errors: err})
        })
    })
    .get('/:id/services', function (req, res, next) {
        DeviceService.findAll({where: {dev: req.params.id}}).then((services) => {
            res.send(services);
        });
    })
    .get('/viewgroups', function (req, res, next) {
        ViewGroup.findAll({where: {}, include: [{model: Language, as: 'translate'}]}).then((views) => {
            res.json(views);
        })
    })
    .get('/groups', function (req, res, next) {
        DeviceGroup.findAll({
            where: {},
            include: [{model: Device, as: 'devices', where: {ctrl: context.controller}}]
        }).then((groups) => {
            res.json(groups);
        })
    })
    .get('/services/:id/works', function (req, res, next) {
        DeviceWork.findAll({
            where: {service_id: req.params.id},
            include: [{model: Work, as: 'description'}]
        }).then((works) => {
            res.send(works);
        })
    })
    //====================================
    //      GET BY ID
    //====================================
    .get('/:id', function (req, res, next) {
        res.send('i am getting stuff with id:' + req.params.id);
    })
    //====================================
    //      SEND BY ID
    //====================================
    .post('/:id', function (req, res, next) {
        res.send('i am posting all tests stuff');

    })
    //====================================
    //      INSERT/UPDATE BY ID
    //====================================
    .put('/:id', function (req, res, next) {
        Device.update(req.body, {where: {id: req.params.id}}).then(() => {
            Device.findById(req.params.id).then((deviceService) => {
                res.send(deviceService);
            })
        });
    })


    //====================================
    //      MAKING SERVICE
    //====================================
    .put('/:deviceID/services/:serviceID', function (req, res, next) {
        DeviceService
            .update(req.body, {where: {id: req.params.serviceID}})
            .then((deviceService) => {
                DeviceWork.findAll({
                    where: {service_id: req.params.serviceID},
                    include: [{model: Work, as: 'description'}]
                }).then((deviceServiceWorks) => {
                    let promises = [];
                    let doneWorks = '';
                    deviceServiceWorks.forEach((deviceServiceWork) => {
                        if (deviceServiceWork.get('done') === 1) {
                            doneWorks += deviceServiceWork.get('description').desc + ', '
                        } else {
                            doneWorks += '';
                        }

                        //promises.push( DeviceServiceWork.update );
                    });
                    doneWorks += ';'

                    DeviceWork.update({done: 0}, {where: {service_id: req.params.serviceID}}).then(() => {
                        History
                            .create({
                                dev: req.params.deviceID,
                                txt: 'Проведено ТО' + req.body.ser_num + '; Выполнил: администратор;' + 'Выполненые работы: ' + doneWorks + ' Дата проведения: ' + new Date(),
                                usr: 1
                            })
                            .then(() => {
                                DeviceService.findById(req.params.serviceID).then((devServ) => {
                                    res.json(devServ);
                                });
                            });
                    });
                });

            });

    })
    //====================================
    //      MAKING UNSHEDULED SERVICE
    //====================================  
    .put('/:deviceID/unsheduled', function (req, res, next) {
        History
            .create({
                dev: req.params.deviceID,
                txt: 'Выполнен внеплановый ремонт:' + req.body.txt + '; Выполнил: администратор; Дата проведения: ' + new Date(),
                usr: 1
            })
            .then(() => {
                DeviceService.findById(req.params.serviceID).then((devServ) => {
                    res.json(devServ);
                });
            });

    })
    .put('/services/:serviceID/works/:workID', function (req, res, next) {

        DeviceWork
            .update(req.body, {where: {id: req.params.workID}})
            .then((deviceServiceWork) => {
                History
                    .create({
                        dev: req.body.dev,
                        txt: 'Выполнена работа:' + req.body.ser_num + '; Выполнил: администратор; Дата проведения: ' + new Date(),
                        usr: 1
                    })
                    .then(() => {
                        DeviceWork
                            .findById(req.params.workID)
                            .then((devServWork) => {
                                res.json(devServWork);
                            });
                    });

            });

    })
    //====================================
    //      DELETE BY ID
    //====================================
    .delete('/:id', function (req, res, next) {
        res.send('i am deleting all tests stuff');
    });

module.exports = router;