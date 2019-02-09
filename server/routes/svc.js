'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../models')


/* GET home page. */
router
    .get('/events', function(req, res, next) {
        res.end();
    })
    .get('/sources', function(req, res, next) {
        res.end();
    })
    .get('/update', function(req, res, next) {
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
                    ]
                }]
            }]
        }).then((devices) => {
            res.json(devices);
        })
    })
    .get('/updateservice', function(req, res, next) {
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
                    }, ]
                }]
            }]
        }).then((devices) => {

            Promise.all(devices.map((device, index) => {
                let type = device.get('type').get('id');
                return Service.bulkCreate([{
                        ser_num: 1,
                        typ: type,
                        name: 'TO1',
                        device_type: type
                    },
                    {
                        ser_num: 2,
                        typ: type,
                        name: 'TO2',
                        device_type: type
                    },
                    {
                        ser_num: 3,
                        typ: type,
                        name: 'TO3',
                        device_type: type
                    },
                    {
                        ser_num: 4,
                        typ: type,
                        name: 'TO4',
                        device_type: type
                    },
                    {
                        ser_num: 5,
                        typ: type,
                        name: 'TO5',
                        device_type: type
                    }
                ]);
            })).then((services) => {

                Promise.all(services.map((service) => {
                    return Promise.all(service.map((ser) => {
                        let service = ser.get('id');
                        let service_number = ser.get('ser_num');
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
                        ])
                    }));
                })).then((works) => {
                    res.json(works)
                })

            })

        })

    })
    .get('/updatedeviceservice', function(req, res, next) {
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
                    }, ]
                }]
            }]
        }).then((devices) => {
            Promise.all(devices.map((device, index) => {
                let type = device.get('type');
                let services = type.get('services');


                if (services.length > 0) {
                    return Promise.all(services.map((service) => {
                        return DeviceService
                            .create({
                                ctrl: device.get('ctrl'),
                                dev: device.get('id'),
                                ser_num: service.get('ser_num'),
                                service_id: service.get('id'),
                                _lim: 0,
                                _pre: 666,

                            })
                            .then((serv) => {
                                return Promise.all(service.works.map((work) => {
                                    return {
                                        ctrl: device.get('ctrl'),
                                        dev: device.get('id'),
                                        ser_num: serv.get('ser_num'),
                                        work: work.get('id'),
                                        service_id: serv.get('id')
                                    }
                                })).then((works) => {
                                    return DeviceWork
                                        .bulkCreate(works)
                                        .then((deviceworks) => {
                                            return deviceworks
                                        })
                                })
                            })
                        //
                    }))

                } else {
                    res.send('no services')
                }

            })).then((services) => {
                res.json(services)
            })

        })

    })
module.exports = router;