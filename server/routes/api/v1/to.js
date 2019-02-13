const { Router } = require('express');
const _ = require('underscore');
const moment = require('moment');

const db = reqm('db');
const router = Router();
const { Device } = db;

const {
  History, Service, ServiceWork, DeviceService, DeviceServiceWork, DeviceTMC, Type, Work, WorkMaterial, Material,
} = db;
const devices = _.toArray(require('../config').ctrl.devs);

const { CONTROLLER_ID } = process.env;

router
  .get('/', (req, res, next) => {
    Device
      .findAll({
        where: {
          ctrl: config.controller,
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
                  model: Material,
                }],
              }],
            }],
          }],
        }],
      })
      .then((devices) => {
        Promise.all(devices.map(device => ({
          device,
          type: device.get('type'),
        })))
          .then((types) => {
            const services = [];
            const createServices = [];
            const createWorks = [];
            types.map((type) => {
              const typ = type.type;
              const device = type.controller;
              const servs = typ.get('service');
              if (servs.length) {
                Promise.all(servs.map((service) => {
                  createWorks.push({
                    id: service.get('id'),
                    service: service.toJSON(),
                    works: service.get('works'),
                  });
                  return DeviceService.create({
                    ctrl: device.get('ctrl'),
                    dev: device.get('id'),
                    ser_num: service.get('ser_num'),
                    _lim: service.get('_set'),
                    _pre: 0,
                    ser_type: service.get('ser_type'),
                    service_id: service.get('id'),
                  });
                })).then((devservices) => {
                  devservices.map((devser) => {
                    const works = _.findWhere(createWorks, { id: devser.get('service_id') }).works;
                    Promise.all(works.map(work => DeviceServiceWork.create({
                      ctrl: device.get('ctrl'),
                      ser_num: devser.get('ser_num'),
                      service_id: devser.get('id'),
                      work_id: work.get('id'),
                      typ: work.get('dev'),
                      dev: device.get('id'),
                      user_occ: work.get('user_occ'),
                    }))).then((dsws) => {
                      dsws.map((dsw) => {
                      });
                    });
                  });
                });
              }
            });

            res.send(services);
          });
      });
  });

router.get('/services', (req, res, next) => {
  DeviceService.findAll({
    where: {
      ctrl: CONTROLLER_ID,
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
                as: 'mat',
              }],
            }],
          },
          {
            model: Type,
            as: 'devicetype',
          },
        ],
      },
    ],
  }).then((services) => {
    res.json(services);
  });
});

router.get('/dev', (req, res, next) => {
  Device.findAll({
    where: {
      ctrl: config.controller,
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
           }] */
        }],
      }],
    }],
  }).then((devices) => {
    res.json(devices);
  });
});

router.get('/servicejournal', (req, res, next) => {
  console.log('Launch route', History);
  History.findAll({
    where: {
      ctrl: CONTROLLER_ID,
    },
    order: [['last_service', 'DESC']],
    limit: 20,
  }).then((history) => {
    res.json(history);
  }).catch((e) => {
    console.log(e);
    res.send(e);
  });
});

router.put('/', (req, res) => {
  const { id, ser, ser_num } = req.body;

  DeviceService.findById(req.body.id).then((service) => {
    const device = _.find(devices, { id: service.get('id') });

    const updatedField = {
      _pre: device.moto,
    };
    service
      .update(updatedField)
      .then((upService) => {
        const dname = device.name;
        const date = moment().format('d.MM.YYYY HH:MM:ss');
        const works = ser.performed.length === 0 ? 'Работ не выполнено' : (() => {
          let performText = 'Выполнены работы по следующему оборудованию: ';
          ser.performed.map((work, index) => {
            let sign = '';
            if (index + 1 < ser.performed.length) {
              sign = ', ';
            } else {
              sign = '';
            }
            performText += `${work.deviceName}${sign}`;
          });
          return performText;
        })();
        const description = `${dname}<br> <p class='service-aligner'>${date}<br> Выполнено ТО${ser_num}<br> ${works}</p>`;
        const historyRow = {
          service_id: id,
          description,
          last_service: moment(),
          ctrl: req.body.ctrl,
        };
        Promise
          .all(ser.performed.map((work) => {
            console.log('updating service work suka');
            return DeviceServiceWork.update({ perform: 0 }, { where: { id: work.id } }).then();
          }))
          .then(() => {
            History.create(historyRow).then(() => {
              DeviceService.findById(id).then((service) => {
                res.json(service);
              });
            });
          });
      });
  });
});

router.put('/performworks', (req, res) => {
  const performed = req.body;
  Promise.all(performed.map(work => DeviceServiceWork.findById(work.id, {
    include: [
      {
        model: DeviceService,
        as: 'devser',
      }, {
        model: Type,
        as: 'devicetype',

      },
    ],
  }).then((work) => {
    const service = work.get('devser');
    const type = work.get('devicetype');
    const device = _.find(devices, { id: work.get('dev') });
    const sernum = service.get('ser_num');
    const typText = type.get('name');
    const serText = 'Выполнена работа по следующему устройству';
    const description = `${device.name} <br><p class='service-aligner'> ТО${sernum} <br> ${serText}: ${typText}</p> `;
    const historyRow = {
      service_id: work.get('service_id'),
      description,
      last_service: moment(),
      ctrl: device.ctrl,
    };
    History.create(historyRow);
    return work.update({
      perform: 1,
      perform_date: work.datetime,
    });
  }))).then((data) => {
    res.json(data);
  });
});

router.put('/performrepair', (req, res) => {
  const data = req.body;
  const name = data.deviceName;
  const text = data.text;
  const ctrl = data.ctrl;
  const descText = 'Выполнен ремонт';
  const repText = 'Текст ремонта';
  const datetime = moment();
  const description = `${name}<br> ${descText}<br> ${datetime}<br> ${repText}: ${text}`;

  const historyRow = {
    service_id: null,
    description,
    last_service: datetime,
    ctrl,
  };

  History.create(historyRow).then((data) => {
    res.end();
  });
});

module.exports = router;
