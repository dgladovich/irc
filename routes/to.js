'use strict';
const express = require('express');
const router = express.Router();
const path = require('path')
const _ = require('underscore');
const moment = require('moment');
const db = require('../models');
const {History, Service, ServiceWork, DeviceService, DeviceServiceWork, DeviceTMC, Type, Work, WorkMaterial, Material} = db;
const devices = _.toArray(require('../config').ctrl.devs);
const {CONTROLLER_ID} = process.env;
/* GET home page. */
router
    .get('/', function (req, res, next) {
        Device
            .findAll({
                where: {
                    ctrl: config.controller
                },
                include: [{
                    model: Type,
                    as: 'type',
                    include: [{
                        model: Service,
                        as: 'service',
                        include: [{
                            model: Work,
                            as: 'works',
                            include: [{
                                model: WorkMaterial,
                                as: 'materials',
                                include: [{
                                    model: Material
                                }]
                            }]
                        }]
                    }]
                }]
            })
            .then((devices) => {
                Promise.all(devices.map((device) => {
                    return {
                        device: device,
                        type: device.get('type')
                    }
                }))
                    .then((types) => {
                        let services = [];
                        let createServices = [];
                        let createWorks = [];
                        types.map((type) => {
                            let typ = type.type;
                            let device = type.device;
                            let servs = typ.get('service')
                            if (servs.length) {
                                Promise.all(servs.map((service) => {
                                    createWorks.push({
                                        id: service.get('id'),
                                        service: service.toJSON(),
                                        works: service.get('works')
                                    });
                                    return DeviceService.create({
                                        ctrl: device.get('ctrl'),
                                        dev: device.get('id'),
                                        ser_num: service.get('ser_num'),
                                        _lim: service.get('_set'),
                                        _pre: 0,
                                        ser_type: service.get('ser_type'),
                                        service_id: service.get('id')
                                    })
                                })).then((devservices) => {
                                    devservices.map((devser) => {
                                        let works = _.findWhere(createWorks, {id: devser.get('service_id')}).works;
                                        Promise.all(works.map((work) => {
                                            return DeviceServiceWork.create({
                                                ctrl: device.get('ctrl'),
                                                ser_num: devser.get('ser_num'),
                                                service_id: devser.get('id'),
                                                work_id: work.get('id'),
                                                typ: work.get('dev'),
                                                dev: device.get('id'),
                                                user_occ: work.get('user_occ')
                                            })
                                        })).then((dsws) => {
                                            dsws.map((dsw) => {
                                                //console.log(dsw.toJSON())
                                            })
                                        })
                                    })
                                })
                            }
                        });

                        res.send(services)
                    })
            })
    })
    .get('/services', function (req, res, next) {
        DeviceService.findAll({
            where: {
                ctrl: CONTROLLER_ID
            },
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
                            as: 'devicetype'
                        },
                    ]
                }
            ]
        }).then((services) => {
            res.json(services)
        })
    })
    .get('/dev', (req, res, next) => {
        Device.findAll({
            where: {
                ctrl: config.controller
            },
            include: [{
                model: DeviceService,
                as: 'service',
                include: [{
                    model: DeviceServiceWork,
                    as: 'serviceWorks',
                    include: [{
                        model: Work,
                        as: 'works',
                        /*                        include: [{
                         model: WorkMaterial,
                         as: 'materials',
                         include: [{
                         model: Material
                         }]
                         }]*/
                    }]
                }]
            }]
        }).then((devices) => {
            res.json(devices)
        })
    })
    .get('/servicejournal', (req, res, next) => {
        console.log('Launch route', History)
        History.findAll({
            where: {
                ctrl: CONTROLLER_ID
            },
            order: [['last_service', 'DESC']],
            limit: 20
        }).then((history) => {
            res.json(history)
        }).catch((e) => {
            console.log(e)
            res.send(e);
        })
    })
    .put('/', (req, res) => {
        let id = req.body.id,
            ser = req.body;
        DeviceService.findById(req.body.id).then((service) => {
            let device = _.find(devices, {id: service.get('id')});

            let updatedField = {
                _pre: device.moto
            }
            service
                .update(updatedField)
                .then((upService) => {
                    let dname = device.name,
                        date = moment().format('d.MM.YYYY HH:MM:ss'),
                        ser_num = req.body.ser_num,
                        works = ser.performed.length === 0 ? 'Работ не выполнено' : (() => {
                            let performText = `Выполнены работы по следующему оборудованию: `
                            ser.performed.map((work, index) => {
                                let sign = '';
                                if (index + 1 < ser.performed.length) {
                                    sign = ', '
                                } else {
                                    sign = ''
                                }
                                performText += work.deviceName + `${sign}`;

                            })
                            return performText;
                        })()
                    let description = `${dname}<br> <p class='service-aligner'>${date}<br> Выполнено ТО${ser_num}<br> ${works}</p>`;
                    let historyRow = {
                        service_id: id,
                        description: description,
                        last_service: moment(),
                        ctrl: req.body.ctrl
                    };
                    Promise
                        .all(ser.performed.map((work) => {
                            console.log('updating service work suka')
                            return DeviceServiceWork.update({perform: 0}, {where: {id: work.id}}).then()
                        }))
                        .then(() => {
                            History.create(historyRow).then(() => {
                                DeviceService.findById(id).then((service) => {
                                    res.json(service)
                                })
                            })
                        });
                })
        });
    })
    .put('/performworks', (req, res) => {
        let performed = req.body;
        Promise.all(performed.map((work) => {
            return DeviceServiceWork.findById(work.id, {
                include: [
                    {
                        model: DeviceService,
                        as: 'devser',
                    }, {
                        model: Type,
                        as: 'devicetype',

                    },
                ]
            }).then((work) => {
                let service = work.get('devser');
                let type = work.get('devicetype');
                let device = _.find(devices, {id: work.get('dev')});
                let sernum = service.get('ser_num');
                let typText = type.get('name');
                let serText = `Выполнена работа по следующему устройству`;
                let description = `${device.name} <br><p class='service-aligner'> ТО${sernum} <br> ${serText}: ${typText}</p> `;
                let historyRow = {
                    service_id: work.get('service_id'),
                    description: description,
                    last_service: moment(),
                    ctrl: device.ctrl
                }
                History.create(historyRow);
                return work.update({
                    perform: 1,
                    perform_date: work.datetime
                })
            });
        })).then((data) => {
            res.json(data);
        });
    })
    .put('/performrepair', (req, res) => {
        let data = req.body,
            name = data.deviceName,
            text = data.text,
            ctrl = data.ctrl,
            descText = `Выполнен ремонт`,
            repText = `Текст ремонта`,
            datetime = moment(),
            description = `${name}<br> ${descText}<br> ${datetime}<br> ${repText}: ${text}`,
            historyRow = {
                service_id: null,
                description: description,
                last_service: datetime,
                ctrl: ctrl
            };

        History.create(historyRow).then((data) => {
            res.end()
        });

    });

module.exports = router;
