'use strict';

const express = require('express');

const router = express.Router();
const path = require('path');
const db = require('../db');


/* GET home page. */
router
    .get('/events', (req, res, next) => {
        res.end();
    })
    .get('/sources', (req, res, next) => {
        res.end();
    })
    .get('/update', (req, res, next) => {
        Device.findAll({
            include: [{
                model: Type,
                as: 'type',
                include: [{
                    model: Service,
                    as: 'services',
                    include: [{
                            model: Work,
                            as: 'works',
                        },
                    ],
                }],
            }],
        }).then((devices) => {
            res.json(devices);
        });
    })
    .get('/updateservice', (req, res, next) => {
        Device.findAll({
            include: [{
                model: Type,
                as: 'type',
                include: [{
                    model: Service,
                    as: 'services',
                    include: [{
                        model: Work,
                        as: 'works',
                    }],
                }],
            }],
        }).then((devices) => {
            Promise.all(devices.map((device, index) => {
                const type = device.get('type').get('id');
                return Service.bulkCreate([{
                        ser_num: 1,
                        typ: type,
                        name: 'TO1',
                        device_type: type,
                    },
                    {
                        ser_num: 2,
                        typ: type,
                        name: 'TO2',
                        device_type: type,
                    },
                    {
                        ser_num: 3,
                        typ: type,
                        name: 'TO3',
                        device_type: type,
                    },
                    {
                        ser_num: 4,
                        typ: type,
                        name: 'TO4',
                        device_type: type,
                    },
                    {
                        ser_num: 5,
                        typ: type,
                        name: 'TO5',
                        device_type: type,
                    },
                ]);
            })).then((services) => {
                Promise.all(services.map(service => Promise.all(service.map((ser) => {
                        const service = ser.get('id');
                        const service_number = ser.get('ser_num');
                        return Promise.all([
                            Work.bulkCreate([{
                                    service_id: service,
                                    ser_num: service_number,
                                    desc: 'work which I should do 1',
                                    active: 1,
                                },
                                {
                                    service_id: service,
                                    ser_num: service_number,
                                    desc: 'work which I should do 2',
                                    active: 1,
                                },
                                {
                                    service_id: service,
                                    ser_num: service_number,
                                    desc: 'work which I should do 3',
                                    active: 1,
                                },
                            ]),
                        ]);
                    })))).then((works) => {
                    res.json(works);
                });
            });
        });
    })
    .get('/updatedeviceservice', (req, res, next) => {
        Device.findAll({
            include: [{
                model: Type,
                as: 'type',
                include: [{
                    model: Service,
                    as: 'services',
                    include: [{
                        model: Work,
                        as: 'works',
                    }],
                }],
            }],
        }).then((devices) => {
            Promise.all(devices.map((device, index) => {
                const type = device.get('type');
                const services = type.get('services');


                if (services.length > 0) {
                    return Promise.all(services.map(service => DeviceService
                            .create({
                                ctrl: device.get('ctrl'),
                                dev: device.get('id'),
                                ser_num: service.get('ser_num'),
                                service_id: service.get('id'),
                                _lim: 0,
                                _pre: 666,

                            })
                            .then(serv => Promise.all(service.works.map(work => ({
                                        ctrl: device.get('ctrl'),
                                        dev: device.get('id'),
                                        ser_num: serv.get('ser_num'),
                                        work: work.get('id'),
                                        service_id: serv.get('id'),
                                    }))).then(works => DeviceWork
                                        .bulkCreate(works)
                                        .then(deviceworks => deviceworks))),
                        //
                    ));
                }
                    res.send('no services');
            })).then((services) => {
                res.json(services);
            });
        });
    });
module.exports = router;
